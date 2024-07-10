import React from 'react';
import Deck from './Deck';

const Decks = ({ handleDropPokemon, handleSelectPokemon, selectedPokemon, deck1, deck2 }) => {
    const renderDeck = (title, deck, deckId) => (
        <div className={deckId === "deck1" ? "mr-7" : "ml-7"}>
            <Deck 
                title={title}
                onDropPokemon={handleDropPokemon}
                onSelectPokemon={handleSelectPokemon}
                selectedPokemon={selectedPokemon}
                deck={deck}
                deckId={deckId}
            />
        </div>
    );

    return (
        <div className="flex absolute bottom-12 inset-x-0 flex justify-center">
            {renderDeck("Deck 1", deck1, "deck1")}
            {renderDeck("Deck 2", deck2, "deck2")}
        </div>
    );
};

export default Decks;