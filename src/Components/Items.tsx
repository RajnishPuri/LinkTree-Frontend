import React from 'react';
import {
    Facebook, Trash2, Linkedin, Twitter, Github, Globe, Youtube, Instagram,
} from 'lucide-react';
import { Grip, Pencil } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SocialLink {
    _id: string;
    handleName: string;
    description: string;
    link: string;
}

interface ItemsProps {
    content: SocialLink;
    onEdit: (item: SocialLink) => void;
}

const Items = ({ content, onEdit, onDelete }: ItemsProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: content._id,
    });

    const editHandler = (event: any) => {
        onEdit(content);
    };

    const deleteHandler = (e: any) => {
        onDelete(content._id);
    };

    const renderIcon = (handleName: string) => {
        switch (handleName) {
            case 'Facebook':
                return <Facebook />;
            case 'LinkedIn':
                return <Linkedin />;
            case 'Instagram':
                return <Instagram />;
            case 'Twitter':
                return <Twitter />;
            case 'Github':
                return <Github />;
            case 'Youtube':
                return <Youtube />;
            case 'Website':
                return <Globe />;
            default:
                return null;
        }
    };

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            id={content._id}
            className="bg-white shadow-md p-4 m-4 rounded-md flex items-center gap-4 w-full justify-between"
            style={style}
            {...attributes}
        >
            <div className="flex items-center w-full justify-between">
                <div
                    className="flex items-center w-1/12 justify-center cursor-grab"
                    ref={setNodeRef}
                    {...listeners}

                >
                    <Grip />
                </div>

                <div className="flex items-center w-10/12 justify-between">
                    <div className="flex flex-col w-9/12">
                        <h1 className="font-normal text-wrap">{content.handleName}</h1>
                        <p className="font-thin text-wrap">{content.description}</p>
                        <p className="font-light text-wrap">{content.link}</p>
                    </div>
                    <div className="w-2/12 flex justify-center items-center">
                        {renderIcon(content.handleName)}
                    </div>
                </div>

                <div className="flex gap-2 w-1/12 justify-center">
                    <Pencil onClick={(e) => { editHandler(e) }} />
                    <Trash2 onClick={(e) => { deleteHandler(e) }} />
                </div>
            </div>
        </div>
    );
};

export default Items;
