import React, { useState } from "react";
import { dateFormatter } from "../../utilities";
import { useUpdateCustomerInfoBackend } from "../../../backend/customer.backend";

const ProfileImage = ({ profileImage, onClick }) => (
    <div className="flex items-center mb-4">
        <img
            src={profileImage || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300 mr-4 cursor-pointer"
            onClick={onClick}
        />
    </div>
);

const ProfileForm = ({ formData, handleChange}) => (
    <div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Enter your name"
            />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Enter your email"
            />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Enter your address"
            />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Contact</label>
            <input
                type="text"
                name="contact_no"
                value={formData.contact_no}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Enter your contact number"
            />
        </div>
    </div>
);


const ProfileDetails = ({ formData}) => (
    <div>
        <h2 className="text-xl font-bold">{formData.name || "Not set"}</h2>
        <p className="text-gray-600">@{formData.username}</p>
        <p className="mt-2">Email: {formData.email || "Not set"}</p>
        <p>Address: {formData.address || "Not set"}</p>
        <p>Contact: {formData.contact_no || "Not set"}</p>
        <p>Join at: {dateFormatter(formData.created_at)}</p>
    </div>
);

const Modal = ({ showModal, onClose, onImageUpload }) => (
    showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h3 className="text-lg font-semibold mb-4">Upload Profile Image</h3>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onImageUpload}
                    className="mb-4"
                />
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
);

const ProfileAccountComp = ({ customer }) => {
    const {loading,updateInfo} = useUpdateCustomerInfoBackend();
    const [profileImage, setProfileImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        id: customer ? customer.id : 0,
        username:customer ? customer.username : "",
        name: customer ? customer.name : "",
        email: customer ? customer.email : "",
        contact_no: customer ? customer.contact_no : "",
        address: customer ? customer.address : "",
        created_at: customer ? customer.created_at : ""
    });

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                setShowModal(false); // Close modal after upload
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdateUser= async()=>{
        await updateInfo(formData)
    }

    return (
        <div>
            <ProfileImage profileImage={profileImage} onClick={() => setShowModal(true)} />

            {isEditing && !loading ? (
                <ProfileForm formData={formData} handleChange={handleChange}/>
            ) : (
                <ProfileDetails formData={formData} />
            )}

            <div className="mt-4">
                {isEditing ? (
                    <>
                        <button
                            onClick={() => {
                                handleUpdateUser();
                                if(!loading){
                                    setIsEditing(false)
                                }
                            }}
                            className={`${loading?"bg-slate-400":"bg-green-500"} text-white px-4 py-2 rounded mr-2`}
                        disabled={loading}>
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            {/* Modal for image upload */}
            <Modal showModal={showModal} onClose={() => setShowModal(false)} onImageUpload={handleImageUpload} />
        </div>
    );
};

export default ProfileAccountComp;