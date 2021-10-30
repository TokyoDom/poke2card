import { useState, useEffect } from "react";

function PokemonCard({ pokemon }) {
  const [typing, setTyping] = useState([]);

  useEffect(() => {
    getTyping();
  }, [pokemon]);

  const getTyping = async () => {
    setTyping([]);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.name.toLowerCase()}`
    );
    const pokemonInfo = await response.json();
    const types = pokemonInfo.types.map((type) => type.type.name);
    setTyping(types);
  };

  return (
    <section className="container">
      <div className="header">
        <h1 className="name">{pokemon.name}</h1>
        <div className="level">Lv. {pokemon.level ? pokemon.level : 100}</div>
      </div>
      <div className="typing">
        {typing.map((type, i) => (
          <div className={`type ${type}`} key={i}>
            {type}
          </div>
        ))}
      </div>
      <div className="nature">
        <h2>Nature: </h2>
        <span>{pokemon.nature}</span>
      </div>
      <div className="ability">
        <h2>Ability: </h2>
        <span>{pokemon.ability}</span>
      </div>
      <div className="item">
        <h2>Item: </h2>
        <span>{pokemon.item}</span>
      </div>
      <div className="moves-evs">
        <div className="moves">
          <h2>Moves:</h2>
          {pokemon.moves.map((move, i) => (
            <div key={i}>- {move}</div>
          ))}
        </div>
        <div className="evs">
          <h2>EVs:</h2>
          {Object.keys(pokemon.evs).map((stat, i) => (
            <div key={i}>
              +{pokemon.evs[stat]} {stat.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PokemonCard;
