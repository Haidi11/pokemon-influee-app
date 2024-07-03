import React, { useState, useEffect, useRef } from 'react';
import PokemonCard from './PokemonCard';
import CardDeck from './CardDeck';

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [deck1, setDeck1] = useState([]);
    const [deck2, setDeck2] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentIndexRef = useRef(currentIndex);

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon');
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

    const handleSelectPokemon = (pokemon) => {
        setSelectedPokemon(pokemon);
    };

    const handleDropPokemon1 = () => {
        const index = currentIndexRef.current;
        const pokemonToAdd = pokemonList[index];
        setDeck1((prevDeck) => {
            return [...prevDeck, pokemonToAdd];
        });
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handleDropPokemon2 = () => {
        const index = currentIndexRef.current;
        const pokemonToAdd = pokemonList[index];
        setDeck2((prevDeck) => {
            return [...prevDeck, pokemonToAdd];
        });
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    if (pokemonList.length === 0) return <p>Loading...</p>;

    return (
        <>
            <div className="flex">
                <div className="w-133 min-w-133 h-164 flex flex-col justify-center items-center rounded overflow-hidden bg-white shadow-lg">
                    <h2 className='font-montserrat text-black font-sans text-lg font-bold tracking-tight text-center mb-5'>Card Stack</h2>
                    <div className='w-84 h-106'>
                        <PokemonCard onSelect={handleSelectPokemon} pokemon={pokemonList[currentIndex]} />
                    </div>
                </div>

                <div className='w-screen h-screen flex justify-center items-center mr-133'>
                    <div className="max-w-sm rounded overflow-hidden h-360 w-283 bg-white shadow-lg">
                        {selectedPokemon && (
                            <div className="px-6 py-4">
                                <img className="w-[252px] h-[256px] mx-auto" src={selectedPokemon.sprite} alt={selectedPokemon.name} />
                                <div className="flex mx-auto justify-between items-center">
                                    <div className="text-center flex">
                                        <div className="font-montserrat capitalize text-black font-bold text-lg mb-2 mr-1.5">{selectedPokemon.name}</div>
                                        <div className="flex h-[18px]">
                                            {selectedPokemon.types.map((type, idx) => (
                                                <div key={idx} className="capitalize rounded-lg p-1 text-black font-montserrat font-bold text-[10px] font-semibold text-center border-gray-300 shadow-md opacity-100 bg-white mr-1">
                                                    {type}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-customGray font-montserrat font-black text-[14px] tracking-wide text-center">
                                        <span className="text-xs">#</span>{selectedPokemon.baseExperience}
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="text-customGray font-montserrat font-black text-base">{selectedPokemon.height}<span className="text-xs uppercase">dm</span></div>
                                    <div className="text-customGray font-montserrat font-black text-base ml-[22px]">{selectedPokemon.weight / 10}<span className="text-xs uppercase">kg</span></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex absolute bottom-12 inset-x-0 flex justify-center">
                    <div className="mr-7">
                        <CardDeck title="Deck 1" onDropPokemon={handleDropPokemon1} initialDeck={deck1} />
                    </div>
                    <div className="ml-7">
                        <CardDeck title="Deck 2" onDropPokemon={handleDropPokemon2} initialDeck={deck2} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PokemonList;