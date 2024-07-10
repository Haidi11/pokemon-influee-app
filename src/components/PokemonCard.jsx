import React from 'react';
import { useDrag } from 'react-dnd';

const PokemonCard = ({ pokemon, deckId, onSelect }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'POKEMON',
    item: { pokemon, deckId },
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
      className={`rounded-sm border w-84 h-106 border-gray-200 border-opacity-30 shadow-sm bg-white ${
        isDragging ? 'border-blue-500' : 'border-opacity-30'}`}>
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