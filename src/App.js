import Dashbord from './Components/Dashbord/Dashbord';
import { Routes, Route } from "react-router-dom"
import Login from './../src/Components/Login/Login'
import Register from './../src/Components/Register/Register'
import Notifications from './Components/Notifications/Notifications';
import SharedTask from './Components/SharedTask/SharedTask';
import './App.css';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/shared" element={<SharedTask />} />
      </Routes>

    </div>
  );
}

export default App;
