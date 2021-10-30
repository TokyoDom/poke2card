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

  const submitHandler = (e) => {
    //look into directly from pokepaste link
    const parsedTeam = Koffing.parse(teamImport);
    setTeam(parsedTeam.teams[0].pokemon)
    setTeamImport("");
  }

  return (
    <div className="App">
      <TeamInput 
      teamImportHandler={teamImportHandler} 
      submitHandler={submitHandler}
      teamImport={teamImport}
      />
      {team.map(poke => <PokemonCard pokemon={poke}/>)}
    </div>
  );
}

export default App;
