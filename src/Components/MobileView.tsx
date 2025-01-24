import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import './mobileview.css';
import {
    Facebook, Linkedin, Twitter, Github, Globe, Youtube, Instagram,
} from 'lucide-react';

const MobileView = () => {
    const [time, setTime] = useState("");
    const user = useSelector((state: RootState) => state.user.user);
    const {
        backgroundImage,
        bio,
        social,
        user: { profilePhoto, name },
    } = user;

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            setTime(`${hours}:${minutes}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    function footerLinkHandler() {
        window.open('https://github.com/RajnishPuri', '_blank');
    }

    return (
        <div
            className="relative w-full max-w-[360px] aspect-[9/19.5] rounded-[40px] shadow-2xl border-[14px] border-black bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full"></div>

            <div className="absolute top-4 w-full px-6 flex justify-between items-center text-white text-sm font-semibold">
                <div>{time}</div>
                <div className="flex items-center space-x-2">

                    <div className="flex space-x-1 items-end">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        <div className="w-1.5 h-2 bg-white rounded-full"></div>
                        <div className="w-1.5 h-3 bg-white rounded-full"></div>
                        <div className="w-1.5 h-4 bg-white rounded-full"></div>
                    </div>

                    <div className="relative w-6 h-3 border-2 border-white rounded flex items-center justify-start">
                        <div className="absolute -left-1 top-1 w-1 h-1 bg-white rounded"></div>
                        <div className="w-4 h-full bg-green-500 rounded"></div>
                    </div>

                </div>
            </div>


            <div className="flex flex-col w-full h-full mt-4 overflow-y-auto scrollbar-hidden pb-12">
                <div className="flex flex-col items-center mt-8">
                    <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                    />
                    <h1 className="mt-4 text-lg font-semibold text-white">{name}</h1>
                    <p className="mt-2 text-sm text-white text-center px-6 mb-2">{bio}</p>
                </div>

                <div className="flex-1 px-6 pt-6 overflow-y-auto space-y-4 scrollbar-hidden">
                    {social.map((link, index) => (
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
                                    {link.handleName === 'Facebook' ? (
                                        <Facebook size={32} />
                                    ) : link.handleName === 'Twitter' ? (
                                        <Twitter size={32} />
                                    ) : link.handleName === 'LinkedIn' ? (
                                        <Linkedin size={32} />
                                    ) : link.handleName === 'Github' ? (
                                        <Github size={32} />
                                    ) : link.handleName === 'Website' ? (
                                        <Globe size={32} />
                                    ) : link.handleName === 'Youtube' ? (
                                        <Youtube size={32} />
                                    ) : link.handleName === 'Instagram' ? (
                                        <Instagram size={32} />
                                    ) : null}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 w-full text-center py-4 bg-black text-white rounded-b-2xl">
                <p className="text-sm" onClick={footerLinkHandler}>Developer LeGiTCoDeR</p>
            </div>
        </div>

    );
};

export default MobileView;
