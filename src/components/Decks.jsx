import React from 'react';
import Deck from './Deck';

const Decks = ({ handleDropPokemon, deck1, deck2 }) => (
    <div className="flex absolute bottom-12 inset-x-0 flex justify-center">
        <div className="mr-7">
            <Deck title="Deck 1" onDropPokemon={handleDropPokemon} deck={deck1} deckId="deck1"/>
        </div>
        <div className="ml-7">
            <Deck title="Deck 2" onDropPokemon={handleDropPokemon} deck={deck2} deckId="deck2"/>
        </div>
    </div>
);

export default Decks;