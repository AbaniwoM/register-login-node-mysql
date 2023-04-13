import './App.css';
import {
  BrowserRouter as Router,
  Routes as RouterCover,
  Route,
} from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

const App = () => {
  return (
    <div className="App">
      <Router>
        <RouterCover>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </RouterCover>
      </Router>
    </div>
  );
}

export default App;
