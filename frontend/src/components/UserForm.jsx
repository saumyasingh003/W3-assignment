// src/components/UserForm.jsx
import React, { useState } from 'react';
import axios from 'axios';  // Import axios
import { toast } from 'react-hot-toast';

const UserForm = () => {
    const [name, setName] = useState('');
    const [socialHandle, setSocialHandle] = useState('');
    const [images, setImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);

    const handleImageChange = (e) => {
        const files = e.target.files;
        const newImages = Array.from(files);
        setImages(newImages);

        // Preview the images
        const imageUrls = newImages.map((file) => URL.createObjectURL(file));
        setPreviewUrls(imageUrls);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!name || !socialHandle || !images.length === 0) {
            toast.error("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("socialHandle", socialHandle);
        images.forEach((image) => formData.append("images", image));

        try {
            // Make POST request with axios
            const response = await axios.post("http://localhost:5000/api/users/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                toast.success("Form submitted successfully!");
        
                setName('');
                setSocialHandle('');
                setImages([]);
                setPreviewUrls([]);
            
                
            }
        } catch (error) {
            toast.error("Server error. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 w-full">
            <div className="bg-white p-6 rounded-lg shadow-lg ">
                
            <h2 className='text-center text-xl font-bold text-gray-700 mb-6'>User Form (3W assignment)</h2>
                <div className=" mb-6 ">
                    <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Submit Your Info</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label className="block font-medium text-gray-700" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your name"
                            />
                        </div>

                        {/* Social Handle Field */}
                        <div>
                            <label className="block font-medium text-gray-700" htmlFor="socialHandle">
                                Social Media Handle
                            </label>
                            <input
                                type="text"
                                id="socialHandle"
                                value={socialHandle}
                                onChange={(e) => setSocialHandle(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your social handle"
                            />
                        </div>

                        {/* Image Upload Field */}
                        <div>
                            <label className="block font-medium text-gray-700" htmlFor="images">
                                Upload Images
                            </label>
                            <input
                                type="file"
                                id="images"
                                onChange={handleImageChange}
                                accept="image/*"
                                multiple
                                className="w-full p-2    border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="text-center mt-6">
                            <button
                                type="submit"
                                className="w-full text-black py-3 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Section - Preview */}
                <div className=" pl-0  flex flex-col justify-center items-center">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Preview</h3>

                    {/* Name and Social Handle Preview */}
                    <div className="w-full mb-6">
                        <div className="text-lg font-medium text-gray-700">Name: <span className="text-gray-500">{name}</span></div>
                        <div className="text-lg font-medium text-gray-700">Social Handle: <span className="text-gray-500">{socialHandle}</span></div>
                    </div>

                    {/* Image Preview */}
                    {previewUrls.length > 0 && (
                        <div className="grid grid-cols-3 gap-4">
                            {previewUrls.map((url, index) => (
                                <img key={index} src={url} alt="Preview" className="w-20 h-20 rounded-lg shadow-md" />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserForm;
