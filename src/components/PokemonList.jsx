import React, { useState, useEffect, useRef } from 'react';
import NewCardStack from './NewCardStack';
import Decks from './Decks';

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [deck1, setDeck1] = useState([]);
    const [deck2, setDeck2] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentIndexRef = useRef(currentIndex);
    const currentPokemonRef = useRef(null);

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const { results } = data;

                const pokemonWithDetails = await Promise.all(
                    results.map(async (pokemon) => {
                        const detailsResponse = await fetch(pokemon.url);
                        if (!detailsResponse.ok) {
                            throw new Error('Network response was not ok');
                        }
                        const detailsData = await detailsResponse.json();

                        const types = detailsData.types.map((type) => type.type.name);
                        const baseExperience = detailsData.base_experience;

                        return {
                            name: detailsData.name,
                            height: detailsData.height,
                            weight: detailsData.weight,
                            sprite: detailsData.sprites.front_default,
                            types: types,
                            baseExperience: baseExperience,
                        };
                    })
                );

                setPokemonList(pokemonWithDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchPokemonList();
    }, []);

    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    useEffect(() => {
        currentPokemonRef.current = selectedPokemon;
    }, [selectedPokemon]);

    const handleSelectPokemon = (pokemon) => {
        setSelectedPokemon(pokemon);
    };

    const handleDropPokemon = (pokemon, sourceDeckId, destinationDeckId) => {
        if (!pokemon) return;

        if (sourceDeckId === destinationDeckId) return;

        if (sourceDeckId === 'deck1') {
            setDeck1((prevDeck) => prevDeck.filter((p) => p.name !== pokemon.name));
        } else if (sourceDeckId === 'deck2') {
            setDeck2((prevDeck) => prevDeck.filter((p) => p.name !== pokemon.name));
        }

        if (destinationDeckId === 'deck1') {
            setDeck1((prevDeck) => [...prevDeck, sourceDeckId === 'pokemonList' ? currentPokemonRef.current : pokemon]);
        } else if (destinationDeckId === 'deck2') {
            setDeck2((prevDeck) => [...prevDeck, sourceDeckId === 'pokemonList' ? currentPokemonRef.current : pokemon]);
        }

        if (sourceDeckId === 'pokemonList') {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }

        setSelectedPokemon(pokemon);
    };

    if (pokemonList.length === 0) return <p>Loading...</p>;

    return (
        <div className="flex">
            <NewCardStack 
                pokemon={pokemonList[currentIndex]} 
                onSelect={handleSelectPokemon}
            />
            <div className='w-screen h-screen flex justify-center items-center mr-133'>
                {selectedPokemon && (
                    <div className="max-w-sm rounded-lg overflow-hidden h-350 w-283 bg-white shadow-lg">
                        <div className="px-6 py-4">
                            <img className="w-[252px] h-[256px] mx-auto" src={selectedPokemon.sprite} alt={selectedPokemon.name} />
                            <div className="flex mx-auto justify-between items-center">
                                <div className="text-center flex items-center">
                                    <div className="font-montserrat capitalize text-black font-bold text-lg mr-1.5">{selectedPokemon.name}</div>
                                    <div className="flex h-[18px]">
                                        {selectedPokemon.types.map((type, idx) => (
                                            <div key={idx} className="capitalize rounded-lg px-1 text-black font-montserrat font-bold text-10 font-semibold text-center border border-gray-200 shadow-md opacity-100 bg-white mr-1">
                                                {type}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-customGray font-montserrat font-black text-base tracking-wide text-center">
                                    <span className="text-10 uppercase">#</span>{selectedPokemon.baseExperience}
                                </div>
                            </div>

                            <div className="flex">
                                <div className="text-customGray font-montserrat font-black text-base mr-[22px]">{selectedPokemon.weight / 10}<span className="text-10 uppercase">kg</span></div>
                                <div className="text-customGray font-montserrat font-black text-base">{selectedPokemon.height}<span className="text-10 uppercase">cm</span></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Decks 
                handleDropPokemon={handleDropPokemon} 
                handleSelectPokemon={handleSelectPokemon}
                selectedPokemon={selectedPokemon}
                deck1={deck1} 
                deck2={deck2} 
            />
        </div>
    );
};

export default PokemonList;