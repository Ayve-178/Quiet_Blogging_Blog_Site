//import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
//import { auth } from '../../firebase-config';
import './Register.css';

export default function Register() {

  const [formData, setFormData] = useState({
    regUserName: "",
    regUserEmail: "",
    regUserPassword: "",
    regUserConfirmPassword: ""
  });
  const [loading, setLoading] = useState();

  const {register} = useAuth();
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

  console.log(formData);

  async function handleSubmit(e) {
    e.preventDefault();
    if(formData.regUserPassword !== formData.regUserConfirmPassword) {
      return toast.error("Passwords don't match");
    }

    try {
      setLoading(true);
      await register(formData.regUserEmail, formData.regUserPassword, formData.regUserName);
      setLoading(false);
      history("/");
    } catch(error) {
      console.log(error);
      setLoading(false);
      if(error.message === "Firebase: Error (auth/email-already-in-use).") {
        toast.error("You already have an account!");
      } else {
        toast.error("Failed to register!");
      }
    }
  }

  return (
    <div className='register'>
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input 
              name='regUserName' 
              className='registerInput' 
              type='name' 
              required
              placeholder='Enter your username..'
              value={formData.regUserName} 
              onChange={handleChange}
            />
            <label>Email</label>
            <input 
              name='regUserEmail' 
              className='registerInput' 
              type='email' 
              required
              placeholder='Enter your email..' 
              value={formData.regUserEmail}
              onChange={handleChange}
            />
            <label>Password</label>
            <input 
              name='regUserPassword' 
              className='registerInput' 
              type='password'
              required 
              placeholder='Enter your password..' 
              value={formData.regUserPassword}
              onChange={handleChange}
            />
            <label>Confirm Password</label>
            <input 
              name='regUserConfirmPassword' 
              className='registerInput' 
              type='password'
              required 
              placeholder='Enter your password again..' 
              value={formData.regUserConfirmPassword}
              onChange={handleChange}
            />
            <button 
              disabled={loading}
              className="registerButton"
              type='submit'
              onClick={handleSubmit}
            >
                Register
            </button>
        </form>
        <button className="registerLoginButton">
          <Link to='/login' className='link'>LOGIN</Link>
        </button>
    </div>
  )
}

// import './Register.css';

// export default function Register() {
//   return (
//     <div className='register'>Register</div>
//   )
// }

