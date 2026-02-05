import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Connect from './components/Connect';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreateTask from './components/CreateTask';
import ViewTasks from './components/ViewTasks';
import UpdateTask from './components/UpdateTask';
import DeleteTask from './components/DeleteTask';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Connect />} />

        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="home" element={<Home />} />
                <Route path="create" element={<CreateTask />} />
                <Route path="view" element={<ViewTasks />} />
                <Route path="update" element={<UpdateTask />} />
                <Route path="delete" element={<DeleteTask />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


