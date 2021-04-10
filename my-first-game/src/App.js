import './App.css';
import Tile from './components/Tile';

function App() {
  return (
    <div className="App">
      <header className="App-header">Tic Tac Toe</header>
      <Tile mark="X"></Tile>
    </div>
  );
}

export default App;
