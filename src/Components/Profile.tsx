import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setUser } from '../store/slices/userSlice';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const [formData, setFormData] = useState({
        name: user?.user?.name || '',
        email: user?.user?.email || '',
        userName: user?.user?.userName || '',
        bio: user?.bio || '',
        profilePicture: null as File | null,
        backgroundPicture: null as File | null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        if (e.target.files && e.target.files[0]) {
            setFormData((prev) => ({
                ...prev,
                [field]: e.target.files[0],
            }));
        }
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSave = async () => {
        if (!formData.name || !formData.email || !formData.userName) {
            alert('Please fill in all required fields');
            return;
        }

        setLoading(true); // Start loading

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('userName', formData.userName);
            data.append('bio', formData.bio);

            if (formData.profilePicture) {
                data.append('profilePicture', formData.profilePicture);
            }

            if (formData.backgroundPicture) {
                data.append('backgroundPicture', formData.backgroundPicture);
            }

            const response = await axios.put(`${backendUrl}/api/profile/updateProfile`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            dispatch(setUser(response.data.updatedDetail));
            setIsEditing(false);
            alert('Profile updated successfully');
        } catch (error: any) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center p-6 bg-gray-100">
            <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Profile</h1>
                <form className="w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-gray-700 text-sm font-medium mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className={`w-full px-4 py-2 ${isEditing ? 'bg-green-100 text-black border-gray-300' : 'bg-gray-50 border-gray-300'
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                                value={formData.name}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-gray-700 text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className={`w-full px-4 py-2 bg-gray-50 border-gray-300 rounded-lg`}
                                value={formData.email}
                                readOnly
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="userName" className="text-gray-700 text-sm font-medium mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                id="userName"
                                className={`w-full px-4 py-2 ${isEditing ? 'bg-green-100 text-black border-gray-300' : 'bg-gray-50 border-gray-300'
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                                value={formData.userName}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>

                        <div className="flex flex-col sm:col-span-2">
                            <label htmlFor="bio" className="text-gray-700 text-sm font-medium mb-1">
                                Bio
                            </label>
                            <textarea
                                id="bio"
                                className={`w-full px-4 py-2 ${isEditing ? 'bg-green-100 text-black border-gray-300' : 'bg-gray-50 border-gray-300'
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                                value={formData.bio}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                                rows={4}
                                placeholder="Write your bio here..."
                            />
                        </div>
                        <div className="flex flex-col sm:col-span-2">
                            <label htmlFor="profilePicture" className="text-gray-700 text-sm font-medium mb-1">
                                Profile Picture
                            </label>
                            <input
                                type="file"
                                id="profilePicture"
                                className="w-full px-4 py-2"
                                onChange={(e) => handleFileChange(e, 'profilePicture')}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="flex flex-col sm:col-span-2">
                            <label htmlFor="backgroundPicture" className="text-gray-700 text-sm font-medium mb-1">
                                Background Picture
                            </label>
                            <input
                                type="file"
                                id="backgroundPicture"
                                className="w-full px-4 py-2"
                                onChange={(e) => handleFileChange(e, 'backgroundPicture')}
                                disabled={!isEditing}
                            />
                        </div>

                    </div>
                </form>

                <div className="mt-6 flex gap-4">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className={`px-6 py-2 font-medium rounded-lg transition ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white`}
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save'}
                            </button>
                            <button
                                onClick={handleEditClick}
                                className="px-6 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEditClick}
                            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
