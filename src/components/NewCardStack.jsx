import React from 'react';
import PokemonCard from './PokemonCard';

const NewCardStack = ({ pokemon, onSelect }) => (
    <div className="w-133 min-w-133 h-164 flex flex-col justify-center items-center rounded overflow-hidden bg-white shadow-lg">
        <h2 className='font-montserrat text-black font-sans text-lg font-bold tracking-tight text-center'>Card Stack</h2>
        <div>
            {pokemon ? (
                <PokemonCard onSelect={onSelect} pokemon={pokemon} deckId="pokemonList" />
            ) : (
                <p>No more Pokémon left!</p>
            )}
        </div>
    </div>
);

export default NewCardStack;