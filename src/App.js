import logo from './logo.svg';
import './App.css';
import Dashbord from './Components/Dashbord/Dashbord';
import { Routes, Route } from "react-router-dom"
import Inbox from './Components/Inbox/Inbox';
import Login from './../src/Components/Login/Login'
import Register from './../src/Components/Register/Register'
import Notifications from './Components/Notifications/Notifications';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>

    </div>
  );
}

export default App;
