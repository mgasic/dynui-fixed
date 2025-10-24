import { Button } from '@dynui/core';
import './styles.css';

function App() {
  return (
    <main className="app">
      <header className="app__header">
        <h1>DynUI Playground</h1>
        <p>Experiment with DynUI components in isolation.</p>
      </header>

      <section className="app__section">
        <h2>Quick sanity check</h2>
        <Button variant="primary">Hello DynUI</Button>
      </section>
    </main>
  );
}

export default App;
