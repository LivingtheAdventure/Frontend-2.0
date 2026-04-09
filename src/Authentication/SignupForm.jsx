import { useState } from "react";
import axios from "axios";
import { auth } from "./firebase";
import { apiUrl } from "../api/config.js";
import { getApiErrorMessage } from "../api/errors.js";

export default function SignupForm() {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const submit = async () => {
        try {
            setError("");
            setLoading(true);

            if (!auth.currentUser) {
                setError("Please login first.");
                window.location.href = "/auth";
                return;
            }

            const token = await auth.currentUser.getIdToken();

            const res = await axios.post(
                apiUrl("/auth/signup/complete"),
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Signup complete");
            console.log(res.data);
            window.location.href = "/";
        } catch (err) {
            setError(getApiErrorMessage(err, "Signup failed"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="w-full max-w-md bg-[#0b1220] p-8 rounded-2xl shadow-2xl border border-white/10">
                <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold text-white">Signup</h3>
                    <p className="text-sm text-gray-400 mt-1">
                        Complete your profile after OTP login
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-3">
                    <input
                        className="w-full bg-black/40 border border-white/10 text-white placeholder:text-gray-500 p-3 rounded-lg outline-none focus:border-white/30"
                        placeholder="First name"
                        value={form.first_name}
                        onChange={(e) =>
                            setForm({ ...form, first_name: e.target.value })
                        }
                    />

                    <input
                        className="w-full bg-black/40 border border-white/10 text-white placeholder:text-gray-500 p-3 rounded-lg outline-none focus:border-white/30"
                        placeholder="Last name"
                        value={form.last_name}
                        onChange={(e) =>
                            setForm({ ...form, last_name: e.target.value })
                        }
                    />

                    <input
                        className="w-full bg-black/40 border border-white/10 text-white placeholder:text-gray-500 p-3 rounded-lg outline-none focus:border-white/30"
                        placeholder="Email (optional)"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />
                </div>

                <button
                    onClick={submit}
                    disabled={loading}
                    className="w-full mt-5 bg-white text-black p-3 rounded-lg hover:bg-gray-200 disabled:opacity-60 transition font-semibold"
                >
                    {loading ? "Saving..." : "Continue"}
                </button>

                <div className="text-xs text-gray-500 mt-4 text-center">
                    Already logged in?{" "}
                    <a className="text-gray-300 hover:underline" href="/profile">
                        Go to profile
                    </a>
                </div>
            </div>
        </div>
    );
}
