import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import PokemonCard from './PokemonCard';

const CardDeck = ({ title: initialTitle, onDropPokemon, initialDeck }) => {
    const [deck, setDeck] = useState(initialDeck || []);
    const [title, setTitle] = useState(initialTitle);

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

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    return (
        <div ref={drop} className={`bg-white rounded-lg shadow-lg text-left  p-3.5 min-h-40 min-w-209 ${isOver ? 'opacity-100' : ''}`}>
            <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="rounded-lg text-black font-bold text-base tracking-tight text-left outline-none"
            />
            <div className="flex flex-wrap justify-start place-content-around">
                {deck.map((pokemon, index) => (
                    <PokemonCard key={index} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
};

export default CardDeck;