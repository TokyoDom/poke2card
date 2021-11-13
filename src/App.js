import "./App.css";
import { Koffing } from "koffing";
import { useState } from "react";
import TeamInput from "./components/TeamInput";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [teamImport, setTeamImport] = useState("");
  const [team, setTeam] = useState({});
  const [waiting, setWaiting] = useState(false);

  const teamImportHandler = (e) => {
    setTeamImport(e.target.value);
  };

  const submitHandler = async (e) => {
    setWaiting(true);

    //look into directly from pokepaste link
    const parsedTeam = Koffing.parse(teamImport);
    const pokemon = parsedTeam.teams[0].pokemon;

    //get typings if possible
    const promises = [];
    pokemon.forEach((poke) => {
      promises.push(
        fetch(`https://pokeapi.co/api/v2/pokemon/${poke.name.toLowerCase()}`)
      );
    });

    const responses = await Promise.all(promises);

    for (let i = 0; i < responses.length; i++) {
      const res = responses[i];
      let types = [];
      let isKnown = false;

      if (res.ok) {
        const data = await res.json();
        types = data.types.map((type) => type.type.name);
        isKnown = true;
      }

      pokemon[i].types = types;
      pokemon[i].isKnown = isKnown;
    }

    setTeam(parsedTeam);
    setTeamImport("");
    setWaiting(false);
  };

  const addTyping = (i, types) => {
    setTeam(prevTeam => {
      prevTeam.teams[0].pokemon[i].types = types;
      return prevTeam;
    });
  };

  const getImages = async () => {
    setWaiting(true);
    if (Object.keys(team).length === 0) return;

    const body = {
      text: team.toShowdown(),
      team: team.teams[0].pokemon
    };

    const response = await fetch("/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    const images = data.images;

    images.forEach((image, i) => {
      const link = document.createElement("a");
      link.href = `data:image/png;base64,${image}`;
      link.download = team.teams[0].pokemon[i].name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    setWaiting(false);
  };

  return (
    <div className="App">
      <TeamInput
        teamImportHandler={teamImportHandler}
        submitHandler={submitHandler}
        teamImport={teamImport}
        getImages={getImages}
        waiting={waiting}
      />
      {team.teams && team.teams[0].pokemon.map((poke, i) => (
        <PokemonCard key={i} i={i} pokemon={poke} addTyping={addTyping} />
      ))}
    </div>
  );
}

export default App;
