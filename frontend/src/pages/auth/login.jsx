import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';

const Login = ({setCurrentPage}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  };

  return <div className='w-[90vw] md:w=[33vw] p-7 flex-col justify-center'>
    <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
    <p className='text-xs text-slate-700 mt-5 mb-6'>
      Enter your credentials to log in
    </p>

    <form onSubmit={handleLogin}>
      <Input 
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        label='Email Address'
        placeHolder="name@email.com"
        type='text'
      />

      <Input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        label='Password'
        placeHolder="Minimum 8 Characters"
        type='password'
      />
    </form>
  </div>
}

export default Login