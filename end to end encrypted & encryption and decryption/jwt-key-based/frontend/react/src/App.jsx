import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Encrypt from './Encrypt';
import Decrypt from './Decrypt';
import Navigation from './Navigation.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <main className="App">
      <div style={{ padding: 20 }}>
          <div>
            <p style={{ color: 'cyan', textAlign: 'center', fontSize: 22, marginBottom: 40 }}>Lexus - ShareSecretly<br/>By LexusCreations</p>
          </div>
          <Navigation />
          <Routes>
            <Route path="/" element={<Encrypt />} />
            <Route path="/encrypt" element={<Encrypt />} />
            <Route path="/decrypt" element={<Decrypt />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;