import './App.css';
import { Koffing } from "koffing";
import { useState } from "react";
import TeamInput from './components/TeamInput';
import PokemonCard from './components/PokemonCard';

function App() {

  const [teamImport, setTeamImport] = useState("");
  const [team, setTeam] = useState([]);

  const teamImportHandler = (e) => {
    setTeamImport(e.target.value);
  }

  const submitHandler = async (e) => {
    //look into directly from pokepaste link
    const parsedTeam = Koffing.parse(teamImport);
    const pokemon = parsedTeam.teams[0].pokemon;
    
    //get typings if possible 
    const promises = [];
    pokemon.forEach(poke => {
      promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${poke.name.toLowerCase()}`))
    });
    
    const responses = await Promise.all(promises)

    for(let i = 0; i < responses.length; i++) {
      const res = responses[i];
      let types = [];

      if (res.ok) {
        const data = await res.json();
        types = data.types.map(type => type.type.name);
      }

      pokemon[i].types = types;
    }

    setTeam(pokemon)
    setTeamImport("");
  }

  return (
    <div className="App">
      <TeamInput 
      teamImportHandler={teamImportHandler} 
      submitHandler={submitHandler}
      teamImport={teamImport}
      />
      {team.map((poke, i) => <PokemonCard key={i} pokemon={poke}/>)}
    </div>
  );
}

export default App;
