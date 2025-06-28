import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from './pages/signup';
import LoginPage from './pages/login.js';
import DashboardHod from './pages/Hod_dashboard/dashboard_hod.js';
import DashboardOff from './pages/officials/dashboard_off.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import DoneTasks from './pages/DoneTasks.js';
import ForgotPassword from './pages/ForgotPassword.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path='/'element ={<LoginPage/>} />
            <Route path = '/signup' element = {<Signup/>}/>
            <Route path='hod-dashboard' element = {<ProtectedRoute><DashboardHod/></ProtectedRoute>}/>
            <Route path='official-dashboard' element = {<ProtectedRoute><DashboardOff/></ProtectedRoute>}/>
             <Route path="/done-tasks" element={<DoneTasks />} />
             <Route path='/forgot-password'element={<ForgotPassword/>}/>
        </Routes>
      </Router>
       <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        theme="colored"
      />
    </div>
  );
}

export default App;


