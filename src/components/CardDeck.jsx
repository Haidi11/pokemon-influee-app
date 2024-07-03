import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import PokemonCard from './PokemonCard';

const CardDeck = ({ title, onDropPokemon, initialDeck }) => {
    const [deck, setDeck] = useState(initialDeck || []);

    useEffect(() => {
        setDeck(initialDeck || []);
    }, [initialDeck]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'POKEMON',
        drop: (item) => handleDrop(item.pokemon),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const handleDrop = (pokemon) => {
        setDeck((prevDeck) => [...prevDeck, pokemon]);
        onDropPokemon(pokemon);
    };

    return (
        <div
            ref={drop}
            className='bg-white rounded shadow-lg min-h-40 min-w-209'>
            <p className="opacity-100 text-black font-bold text-base tracking-tight p-1.5 text-left">{title}</p>
            <div className="flex flex-wrap justify-center">
                {deck.map((pokemon, index) => (
                    <PokemonCard key={index} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
};

export default CardDeck;
