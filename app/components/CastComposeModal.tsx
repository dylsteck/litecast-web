import React from 'react';
import ModEditor from './ModEditor';
import CastButton from './ui/CastButton';

export default function CastComposeModal(){
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <>
        <CastButton onClick={() => setIsOpen(true)} />
        {isOpen && (
            <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
                <div className="relative bg-white rounded-md shadow-xl p-4 max-h-[85%] w-full max-w-2xl">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-0 right-0 mt-4 pt-1 mr-4 pr-6 text-gray-400 hover:text-gray-600"
                        aria-label="Close modal"
                    >
                        <span className="text-2xl">&times;</span>
                    </button>
                    <ModEditor />
                </div>
            </div>
        )}
        </>
    );
}