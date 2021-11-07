function TeamInput({ teamImport, teamImportHandler, submitHandler, getImages }) {

  return (
    <section className="team-input">
      <textarea 
      value={teamImport}
      placeholder="Paste Team"
      onChange={teamImportHandler}
      >
      </textarea>
      <button onClick={submitHandler}>Submit</button>
      <button onClick={getImages}>Download</button>
    </section>
  );
}

export default TeamInput;