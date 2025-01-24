import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setUser } from "../store/slices/userSlice";

interface SocialLink {
    _id: string;
    handleName: string;
    description: string;
    link: string;
}

interface EditFormProps {
    item: SocialLink;
    onSave: (editedItem: SocialLink) => void;
}

export const EditForm = ({ item, setIsChanged, setIsEdited }: EditFormProps) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    console.log(item);
    const [editedItem, setEditedItem] = useState<SocialLink>(item);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedItem((prevItem) => ({
            ...prevItem,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedLinks = user.social.map((link) => {
            if (link._id === editedItem._id) {
                return editedItem;
            }
            return link;
        });
        dispatch(setUser({ ...user, social: updatedLinks }));
        setIsChanged(true);
        setIsEdited(false);
    };

    const cancelHandler = () => {
        setIsEdited(false);
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Handle Name:</label>
                <select
                    name="handleName"
                    value={editedItem.handleName}
                    onChange={handleChange}
                    className="w-full p-3 mt-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            </div>
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Description:</label>
                <input
                    type="text"
                    name="description"
                    value={editedItem.description}
                    onChange={handleChange}
                    className="w-full p-3 mt-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Link:</label>
                <input
                    type="text"
                    name="link"
                    value={editedItem.link}
                    onChange={handleChange}
                    className="w-full p-3 mt-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex space-x-4">
                <button
                    type="submit"
                    className="w-full sm:w-auto bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={cancelHandler}
                    className="w-full sm:w-auto bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-200"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};
