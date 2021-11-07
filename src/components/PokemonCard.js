import { useState } from "react";

function PokemonCard({ pokemon, i, addTyping }) {
  const [t1, setT1] = useState("");
  const [t2, setT2] = useState("");

  const getTypingManually = () => {
    const types = [];
    if (t1) types.push(t1.toLowerCase());
    if (t2) types.push(t2.toLowerCase());

    if (types.length > 0) {
      addTyping(i, types);
      setT1("");
      setT2("");     
    }
  };

  const renderTyping = () => {
    const typing = pokemon.types;

    if (typing.length === 0) {
      return (
        <>
          <input
            id="type-1"
            value={t1}
            onChange={(e) => setT1(e.target.value)}
            placeholder="type 1"
          />
          <input
            id="type-2"
            value={t2}
            onChange={(e) => setT2(e.target.value)}
            placeholder="type 2"
          />
          <button className="confirm-typing" onClick={getTypingManually}>
            Done
          </button>
        </>
      );
    } else {
      return typing.map((type, i) => (
        <div className={`type ${type}`} key={i}>
          {type}
        </div>
      ));
    }
  };

  return (
    <section className="container">
      <div className="header">
        <h1 className="name">{pokemon.name}</h1>
        <div className="level">Lv. {pokemon.level ? pokemon.level : 100}</div>
      </div>
      <div className="typing">{renderTyping()}</div>
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
          {pokemon.evs && Object.keys(pokemon.evs).map((stat, i) => (
            <div className="ev-plus" key={i}>
              +{pokemon.evs[stat]} {stat.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PokemonCard;
