import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const LandingPage = () => {
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function signinHandler(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/api/user/userLogin`, {
                email,
                password,
            });
            const data = response.data;
            localStorage.setItem('token', data.token);
            localStorage.setItem('userName', data.user.userName);
            navigate('/home');
        } catch (error) {
            console.error("Login failed", error);
            alert('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    }

    async function signupHandler(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/api/user/createUser`, {
                name,
                email,
                password,
                userName,
            });

            if (response.data.success) {
                alert('Signup Successful');
                setActiveButton('signin');
                setEmail('');
                setPassword('');
                setUserName('');
                setName('');
                setConfirmPassword('');
            } else {
                alert(response.data.message || 'Signup failed. Please try again.');
            }
        } catch (error: any) {
            console.error('Signup failed:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-full h-screen flex justify-center bg-green-800 p-5'>
            <div className='w-1/2 flex flex-col ml-10 mt-10'>
                <div className='w-1/2'>
                    <h1 className='text-4xl font-bold w-2/3 text-yellow-300'>LinkTree</h1>
                </div>
                <div className='gap-5 flex flex-col mt-64'>
                    <h1 className='text-4xl font-bold w-2/3 text-yellow-300'>
                        Everything you are. In one, simple link in bio.
                    </h1>
                    <h3 className='text-lg w-4/5 text-green-300'>
                        Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate, and sell from your social media profiles.
                    </h3>
                </div>
            </div>
            <hr className='w-0.5 h-4/5 bg-green-300 flex justify-center items-center mt-20' />
            <div className='w-1/2 flex justify-center items-center'>
                <div className='flex flex-col gap-2 h-1/2 w-full items-center'>
                    <div className="w-fit flex bg-green-950 p-2 rounded-md items-center">
                        <button
                            className={`px-4 rounded-md transition-colors duration-300 ${activeButton === 'signin' ? 'bg-white text-black' : ''}`}
                            onClick={() => setActiveButton('signin')}
                        >
                            Sign in
                        </button>
                        <button
                            className={`px-4 rounded-md transition-colors duration-300 ${activeButton === 'signup' ? 'bg-white text-black' : ''}`}
                            onClick={() => setActiveButton('signup')}
                        >
                            Sign up
                        </button>
                    </div>
                    <div className='text-white flex flex-col gap-3 mt-5 bg-emerald-100 w-1/2 p-5 rounded'>
                        {activeButton === 'signin' ? (
                            <>
                                <input
                                    type="text"
                                    placeholder='Email'
                                    value={email}
                                    className='bg-green-950 p-2 rounded-md'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder='Password'
                                    className='bg-green-950 p-2 rounded-md'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    className='bg-green-800 p-2 rounded-md'
                                    onClick={(e) => signinHandler(e)}
                                    disabled={loading}
                                >
                                    {loading ? 'Loading...' : 'Sign in'}
                                </button>
                            </>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    placeholder='Username'
                                    className='bg-green-950 p-2 rounded-md'
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder='Name'
                                    className='bg-green-950 p-2 rounded-md'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder='Email'
                                    className='bg-green-950 p-2 rounded-md'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder='Password'
                                    className='bg-green-950 p-2 rounded-md'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder='Confirm Password'
                                    className='bg-green-950 p-2 rounded-md'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    className='bg-green-800 p-2 rounded-md'
                                    onClick={(e) => signupHandler(e)}
                                    disabled={loading}
                                >
                                    {loading ? 'Loading...' : 'Sign up'}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
