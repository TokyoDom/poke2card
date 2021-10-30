function TeamInput({ teamImport, teamImportHandler, submitHandler }) {

  return (
    <section className="team-input">
      <textarea 
      value={teamImport}
      placeholder="Paste Team"
      onChange={teamImportHandler}
      >
      </textarea>
      <button onClick={submitHandler}>Submit</button>
    </section>
  );
}

export default TeamInput;