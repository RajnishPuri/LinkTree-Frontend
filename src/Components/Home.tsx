import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setUser } from '../store/slices/userSlice';
import { closestCorners, DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Items from './Items';
import axios from 'axios';
import { EditForm } from './EditForm';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface SocialLink {
    _id: string;
    handleName: string;
    description: string;
    link: string;
}

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const socialLinks = user?.social || [];
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        handleName: '',
        description: '',
        link: '',
    });
    const [isChanged, setIsChanged] = useState(false);
    const [editingItem, setEditingItem] = useState<SocialLink | null>(null);
    const [isEdited, setIsEdited] = useState(false);
    const [deleteItem, setDeleteItem] = useState<SocialLink | null>(null);


    const handleEdit = (item: SocialLink) => {
        setEditingItem(item);
        setIsEdited(true);
    };


    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setIsChanged(true);
            const activeIndex = socialLinks.findIndex((link: any) => link._id === active.id);
            const overIndex = socialLinks.findIndex((link: any) => link._id === over.id);
            const updatedLinks = [...socialLinks];
            [updatedLinks[activeIndex], updatedLinks[overIndex]] = [updatedLinks[overIndex], updatedLinks[activeIndex]];
            dispatch(setUser({ ...user, social: updatedLinks }));

        }
    }

    async function saveHandler() {
        try {
            console.log('Saving links:', socialLinks);
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `${backendUrl}/api/profile/updateSocialLinks`,
                { social: socialLinks },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "authorization": `Bearer ${token}`,
                    },
                }
            );
            dispatch(setUser(response.data.updatedDetail));

        } catch (error) {
            console.error('Error saving links:', error);
            alert('Failed to save the links. Please try again.');
        }
    }

    const addLinkHandler = () => {
        setShowForm((prev) => !prev);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddLink = async () => {
        if (formData.handleName && formData.description && formData.link) {
            try {
                const Response = await axios.post(`${backendUrl}/api/profile/addLink`, {
                    handleName: formData.handleName,
                    description: formData.description,
                    link: formData.link,
                }, {
                    headers: {
                        "authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setFormData({
                    handleName: '',
                    description: '',
                    link: '',
                });
                dispatch(setUser(Response.data.updatedDetail));
                setShowForm(false);

            } catch (error) {
                console.error('Error adding link:', error);
                alert('Failed to add link. Please try again.');
            }
        } else {
            alert('Please fill out all fields.');
        }
    };

    const handleDeleteLink = (id: string) => {
        const updatedLinks = socialLinks.filter((link: any) => link._id !== id);
        dispatch(setUser({ ...user, social: updatedLinks }));
        setIsChanged(true);
    };

    return (
        <div className="w-full h-full flex flex-col items-center p-6 overflow-x-hidden">
            <div>
                <h1 className="text-2xl font-bold">
                    Your <span className="text-green-600">Links</span>
                </h1>
            </div>
            <div className="flex flex-col items-center rounded-lg p-6 w-full max-w-3xl">
                <div className="flex flex-col items-center gap-3 w-full">
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded-md"
                        onClick={addLinkHandler}
                    >
                        {showForm ? 'Cancel' : 'Add Link'}
                    </button>
                    {showForm && (
                        <div className="flex flex-col items-center gap-4 w-1/2 mt-4">
                            <select
                                name="handleName"
                                value={formData.handleName}
                                onChange={handleInputChange}
                                className="border-2 border-gray-300 p-2 rounded-md w-full"
                            >
                                <option value="" disabled>
                                    Select Handle
                                </option>
                                <option value="Facebook">Facebook</option>
                                <option value="LinkedIn">LinkedIn</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Twitter">Twitter</option>
                                <option value="Github">Github</option>
                                <option value="Youtube">Youtube</option>
                                <option value="Website">Website</option>
                            </select>
                            <textarea
                                name="description"
                                placeholder="Enter a description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="border-2 border-gray-300 p-2 rounded-md w-full"
                                rows={4}
                            />
                            <input
                                type="text"
                                name="link"
                                placeholder="Enter the link"
                                value={formData.link}
                                onChange={handleInputChange}
                                className="border-2 border-gray-300 p-2 rounded-md w-full"
                            />
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded-md"
                                onClick={handleAddLink}
                            >
                                Add
                            </button>
                        </div>
                    )}
                </div>
                {isEdited ? (
                    <EditForm item={editingItem} setIsChanged={setIsChanged} setIsEdited={setIsEdited} />
                ) : (
                    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                        <div className="w-2/3">
                            <SortableContext items={socialLinks.map(link => link._id)} strategy={verticalListSortingStrategy}>
                                {socialLinks.map((link) => (
                                    <Items
                                        key={link._id}
                                        content={link}
                                        onEdit={handleEdit}
                                        onDelete={handleDeleteLink}
                                    />
                                ))}
                            </SortableContext>
                        </div>
                    </DndContext>
                )}

                {
                    isChanged && (
                        <div>
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded-md"
                                onClick={() => {
                                    setIsChanged(false)
                                    saveHandler()
                                }
                                }
                            >
                                Save Changes
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Home;
