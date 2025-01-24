import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Facebook, Trash2, Linkedin, Twitter, Github, Globe, Youtube, Instagram,
} from 'lucide-react';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ProfilePage = () => {
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/${username}`);
                setUser(response.data.profile);
            } catch (err) {
                console.error('Error fetching user details:', err);
                setError('Failed to fetch user details');
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUserDetails();
        }
    }, [username]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    function footerLinkHandler() {
        window.open('https://github.com/RajnishPuri', '_blank');
    }


    return (
        <div>
            <div className='w-screen h-screen flex items-center justify-center'>
                <div
                    className="flex flex-col w-full h-full overflow-y-auto scrollbar-hidden bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${user?.backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="flex flex-col items-center mt-8">
                        <img
                            src={user?.user?.profilePhoto}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                        />
                        <h1 className="mt-4 text-lg font-semibold text-white">{user?.user?.name}</h1>
                        <p className="mt-2 text-sm text-white text-center px-6 mb-2">{user?.bio}</p>
                    </div>

                    <div className="flex-1 px-6 pt-6 overflow-y-auto space-y-4 scrollbar-hidden">
                        {user?.social.map((link, index) => (
                            <a
                                key={index}
                                href={link.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-blue-600 font-semibold text-lg">
                                            {link.handleName}
                                        </h2>
                                        <p className="text-gray-600 text-sm mt-1">{link.description}</p>
                                    </div>
                                    <div>
                                        {
                                            link.handleName === 'Facebook' ? <Facebook size={32} />
                                                : link.handleName === 'Twitter' ? <Twitter size={32} />
                                                    : link.handleName === 'LinkedIn' ? <Linkedin size={32} />
                                                        : link.handleName === 'Github' ? <Github size={32} />
                                                            : link.handleName === 'Website' ? <Globe size={32} />
                                                                : link.handleName === 'Youtube' ? <Youtube size={32} />
                                                                    : link.handleName === 'Instagram' ? <Instagram size={32} /> : null
                                        }
                                    </div>

                                </div>
                            </a>
                        ))}
                    </div>
                    <div>

                        <div className=" text-white text-center py-4 rounded-b-2xl">
                            <p className="text-sm text-white" onClick={footerLinkHandler}>Developer LeGiTCoDeR</p>

                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ProfilePage;
