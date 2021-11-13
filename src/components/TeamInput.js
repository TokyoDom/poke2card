function TeamInput({ teamImport, teamImportHandler, submitHandler, getImages, waiting }) {

  return (
    <section className="team-input">
      <textarea 
      value={teamImport}
      placeholder="Paste Team"
      onChange={teamImportHandler}
      >
      </textarea>
      <button className="submit" disabled={waiting} onClick={submitHandler}>Submit</button>
      <button className="download" disabled={waiting} onClick={getImages}>Download</button>
    </section>
  );
}

export default TeamInput;