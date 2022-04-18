import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

export default function Login() {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
  });
  const [loading, setLoading] = useState();

  const {login} = useAuth();
  const history = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => {
      return{
        ...prevData,
        [name]: value,
      }
    })
  }


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await login(formData.userEmail, formData.userPassword);
      setLoading(false);
      history('/');
    } catch(error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to login");
    }
  }
  return (
    <div className='login'>
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Email</label>
            <input 
              name='userEmail'
              className='loginInput' 
              type='email' 
              required
              placeholder='Enter your email..' 
              value={formData.userEmail}
              onChange={handleChange}
            />
            <label>Password</label>
            <input 
              name='userPassword'
              className='loginInput' 
              type='password' 
              required
              placeholder='Enter your password..' 
              value={formData.userPassword}
              onChange={handleChange}
            />
            <button 
              disabled={loading}
              type='submit' 
              className="loginButton"
            >
              Login
            </button>
        </form>
        <button className="loginRegisterButton">
          <Link to='/register' className='link'>REGISTER</Link>
        </button>
    </div>
  )
}
