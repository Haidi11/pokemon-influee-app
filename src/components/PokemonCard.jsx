import React from 'react';
import { useDrag } from 'react-dnd';
import styles from './PokemonList.module.css';

const PokemonCard = ({ pokemon, onSelect }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'POKEMON',
    item: { pokemon },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      onMouseDown={() => {
        onSelect && onSelect(pokemon); // Call onSelect callback with the pokemon
      }}
      className={styles.card}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img src={pokemon.sprite} alt={pokemon.name} />
      <div>
        <div className='font-montserrat opacity-100 text-black font-semibold text-xs tracking-tight text-center capitalize'>
          {pokemon.name}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
