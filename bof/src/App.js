// import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Header from './Header';
import Upload from './Upload';
import Details from './Details';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/listing/:conf/:address" element={<Details/>} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
