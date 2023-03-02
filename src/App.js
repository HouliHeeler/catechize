function App() {
  return (
    <main>
      <section className="trivia--card">
        <div className="card--header">Trivia!</div>
        <section className="card--body">
          <div className="card--question">What are Dwight's three B's?</div>
          <div className="card--answers">
            <ul>
              <li>Bears</li>
              <li>Beets</li>
              <li>Battlestar Galactica</li>
            </ul>
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
