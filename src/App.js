// import logo from './logo.svg';
import './App.css';
import List from './components/List';
import Navbar from './components/Navbar';
import Form from './components/Form';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  
} from "react-router-dom";function App() {

  return (
    <div className="App">
      
      <Router>
      <Navbar />
      {/* <List />  */}
      <Routes>
        <Route path='/list' element={<List />}  />
        <Route path='/add' element={<Form />} />
        <Route path="/add/:id" element={<Form />} />

      </Routes>
      </Router>
      
    </div>
    
  );
}

export default App;
