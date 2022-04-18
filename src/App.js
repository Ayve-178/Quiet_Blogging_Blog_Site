import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, useAuth } from '../src/contexts/AuthContext';
import TopBar from "./components/topbar/TopBar";
import Admin from "./pages/admin/Admin";
import Blogs from "./pages/blogs/Blogs";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Single from "./pages/single/Single";
import Update from "./pages/update/Update";
import Write from "./pages/write/Write";

function App() {
  
  return (
    <div className="App">
      <ToastContainer />
      <AuthProvider>
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="single/:postId" element={<Single />} />
          <Route path="write" element={<ProtectedRoutes><Write /></ProtectedRoutes>} />
          <Route path="blogs/:userId" element={<ProtectedRoutes><Blogs /></ProtectedRoutes>} />
          <Route path="update/:postUpdateId" element={<ProtectedRoutes><Update /></ProtectedRoutes>} />
          <Route path="admin" element={<AdminPanel><Admin /></AdminPanel>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

export const ProtectedRoutes = ({children}) =>{
  const {currentUser} = useAuth();
  if(currentUser) {
    return children;
  } else {
    return <Navigate to='/login' />
  }
}

export const AdminPanel = ({children}) => {
  const {currentUser} = useAuth();
  if(currentUser.uid === "Uc6ZDSNUrDOdbv2igXzea63HRng2") {
    return children;
  } else {
    return <Navigate to='/' />
  }
}
