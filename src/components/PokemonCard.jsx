import React from 'react';
import { useDrag } from 'react-dnd';

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
        onSelect && onSelect(pokemon);
      }}
      className="rounded-lg border border-gray-300 shadow-sm bg-white">
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
