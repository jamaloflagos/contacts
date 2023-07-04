import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
// import Login from "./components/Login";
import Signup from "./components/Signup";
import { useLogout } from "./hooks/useLogout";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import Login from "./components/Login";




function App() {

  const {logout} = useLogout()
  const {user} = useAuthContext()

  const handleLogout = () => {
    logout()
  }

  return (
    <BrowserRouter>
      <div className="App">
        {!user && <Navbar />}
        {user && <button onClick={handleLogout}>Logout</button>}
        <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to='login' />} />
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/'/>} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/'/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
