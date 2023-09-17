
import './App.css';
import { Link, Routes, Route } from "react-router-dom";
import Create from "./components/Create";
import { Main } from './components/Main';
import Update from './components/Update';


function App() {
  return (
    <div className="App">
      <h1>Favorite authors</h1>
      <Link to="">Home</Link>
      

      <Routes>
       { /* main all authors */ }
        <Route path="/" element={<Main />} />
        { /* create */ }
        <Route path="/create" element={<Create />} />
        { /* update */ }
        <Route path="/authors/:id/edit" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
