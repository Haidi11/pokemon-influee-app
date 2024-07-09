import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import PokemonCard from './PokemonCard';

const Deck = ({ title: initialTitle, onDropPokemon, deck, deckId, onRemovePokemon }) => {
    const [title, setTitle] = useState(initialTitle);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'POKEMON',
        drop: (item) => handleDrop(item.pokemon, item.deckId),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const handleDrop = (pokemon, sourceDeckId) => {
        if (!pokemon) return;
        onDropPokemon(pokemon, sourceDeckId, deckId);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    return (
        <div ref={drop} className={`bg-white rounded-lg shadow-lg text-left p-3.5 pr-[5px] min-h-40 min-w-209 ${isOver ? 'opacity-100' : ''}`}>
            <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="rounded-lg text-black font-bold text-base tracking-tight text-left outline-none"
            />
            <div className="flex flex-wrap justify-start place-content-between">
                {deck.map((pokemon, index) => (
                    <div key={index} className="mr-2.5">
                        <PokemonCard key={index} pokemon={pokemon} deckId={deckId} onRemove={onRemovePokemon} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Deck;