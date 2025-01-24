import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../store/slices/userSlice';
import { RootState } from '../store/store';
import { Trees } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Profile from '../Components/Profile';
import Home from '../Components/Home';
import MobileView from '../Components/MobileView';
import Logout from '../Components/Logout';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const HomePage = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const userName = localStorage.getItem('userName');
    const currentPage = useSelector((state: RootState) => state.currentPage.currentPage);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!userName) {
                setError('Username not found in local storage');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${backendUrl}/api/${userName}`);
                if (response.data?.profile) {
                    dispatch(setUser(response.data.profile));
                } else {
                    setError('User profile not found in response');
                }
            } catch (err) {
                console.error('Error fetching user details:', err);
                setError('Failed to fetch user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [dispatch, userName]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-screen h-screen bg-gray-200 flex flex-col items-center p-4 overflow-hidden">
            <div className="flex h-[34px] ">
                <h1 className="text-2xl font-semibold">
                    Welcome to the <span className="text-green-900">LinkTree</span>
                </h1>
                <Trees size={32} className="ml-2 text-green-900" />
            </div>
            <hr className="w-full my-4 border-t border-gray-100" />
            <div className="flex w-full gap-2 flex-1 overflow-hidden">
                <div className="w-2/12 h-full p-4 rounded-lg shadow-lg bg-gray-100">
                    <Navbar />
                </div>
                <div className="w-6/12 p-4 rounded-lg shadow-lg bg-gray-100 overflow-y-auto ">
                    {currentPage === 'home' ? (
                        <Home />
                    ) : currentPage === 'profile' ? (
                        <Profile />
                    ) : currentPage === 'logout' ? (
                        <Logout />
                    ) : (
                        <div>
                            <h1 className="text-2xl font-semibold">404 Not Found</h1>
                            <p>The page you are looking for does not exist.</p>
                        </div>
                    )}
                </div>
                <div className="w-4/12 h-full flex justify-center items-center">
                    <MobileView />
                </div>

            </div>
        </div>

    );
};

export default HomePage;
