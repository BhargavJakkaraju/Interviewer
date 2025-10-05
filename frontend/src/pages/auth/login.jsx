import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({setCurrentPage}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  };

  return <div className='w-[90vw] md:w:w=[33vw] p-7 flex-col justify-center'>
    <h3 className=''>Welcome Back</h3>
    <p className=''>
      Enter your credentials to log in
    </p>

    <form onSubmit={handleLogin}>


    </form>

  </div>
}

export default Login