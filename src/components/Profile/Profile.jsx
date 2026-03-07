import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserCircle, FaEdit } from "react-icons/fa";

function Profile() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [editMode, setEditMode] = useState(false);

    const [profile, setProfile] = useState({
        first_name: "",
        last_name: "",
        email: ""
    });

    useEffect(() => {
        if (!user) {
            navigate("/auth");
        }
    }, [user]);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#0f172a] text-white">

            {/* Adventure Graphic Background */}
            <div className="h-60 relative overflow-hidden">

                <img
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
                    className="w-full h-full object-cover opacity-40"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[#0f172a]" />

            </div>

            <div className="max-w-6xl mx-auto px-6">

                {/* Horizontal Profile Card */}
                <div className="bg-[#1e293b] shadow-2xl rounded-2xl p-8 -mt-20 flex gap-8 items-center border border-gray-700">

                    {/* Avatar Section */}
                    <div className="flex flex-col items-center">

                        <FaUserCircle className="text-gray-400 text-8xl" />

                        <p className="mt-3 text-sm text-gray-400">
                            Adventure Explorer
                        </p>

                    </div>

                    {/* Profile Info */}
                    <div className="flex-1">

                        <div className="flex justify-between items-center mb-6">

                            <h1 className="text-2xl font-semibold">
                                Your Profile
                            </h1>

                            {!editMode && (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <FaEdit />
                                </button>
                            )}

                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            {/* Phone */}
                            <div>
                                <label className="text-xs text-gray-400">Phone</label>
                                <div className="bg-[#020617] border border-gray-700 rounded px-3 py-2 text-gray-300">
                                    {user.phoneNumber}
                                </div>
                            </div>

                            {/* First Name */}
                            <div>
                                <label className="text-xs text-gray-400">First Name</label>

                                {editMode ? (
                                    <input
                                        name="first_name"
                                        value={profile.first_name}
                                        onChange={handleChange}
                                        className="w-full bg-[#020617] border border-gray-700 rounded px-3 py-2"
                                    />
                                ) : (
                                    <div className="bg-[#020617] border border-gray-700 rounded px-3 py-2">
                                        {profile.first_name || "Not set"}
                                    </div>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="text-xs text-gray-400">Last Name</label>

                                {editMode ? (
                                    <input
                                        name="last_name"
                                        value={profile.last_name}
                                        onChange={handleChange}
                                        className="w-full bg-[#020617] border border-gray-700 rounded px-3 py-2"
                                    />
                                ) : (
                                    <div className="bg-[#020617] border border-gray-700 rounded px-3 py-2">
                                        {profile.last_name || "Not set"}
                                    </div>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-xs text-gray-400">Email</label>

                                {editMode ? (
                                    <input
                                        name="email"
                                        value={profile.email}
                                        onChange={handleChange}
                                        className="w-full bg-[#020617] border border-gray-700 rounded px-3 py-2"
                                    />
                                ) : (
                                    <div className="bg-[#020617] border border-gray-700 rounded px-3 py-2">
                                        {profile.email || "Not set"}
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* Buttons */}
                        {editMode && (
                            <div className="flex gap-3 mt-6">

                                <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
                                    Save
                                </button>

                                <button
                                    onClick={() => setEditMode(false)}
                                    className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
                                >
                                    Cancel
                                </button>

                            </div>
                        )}

                        <button
                            onClick={handleLogout}
                            className="mt-6 bg-red-500 px-5 py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>

                    </div>

                </div>

                {/* Favourite Section */}
                <div className="mt-12">

                    <h2 className="text-xl font-semibold mb-6">
                        Your Favourite Adventures
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">

                        <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 text-center">
                            <p className="text-gray-400">
                                No favourite trips yet
                            </p>
                        </div>

                        <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 text-center">
                            <p className="text-gray-400">
                                Save treks you love
                            </p>
                        </div>

                        <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 text-center">
                            <p className="text-gray-400">
                                Plan your next adventure
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;