import { useState } from "react";
import axios from "axios";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "./firebase";
import { apiUrl } from "../api/config.js";

/* PHONE NORMALIZER */
const normalizePhone = (phone) => {
    const trimmed = phone.trim();

    if (/^\+\d{10,15}$/.test(trimmed)) return trimmed;

    const digits = trimmed.replace(/\D/g, "");

    if (digits.length === 10) return `+91${digits}`;
    if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;

    throw new Error("Enter valid Indian phone number");
};

export default function Auth() {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState("PHONE");
    const [confirmation, setConfirmation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    /* SETUP RECAPTCHA */
    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                "recaptcha-container",
                {
                    size: "invisible"
                }
            );

            window.recaptchaVerifier.render();
        }
    };

    /* SEND OTP */
    const sendOtp = async () => {
        try {
            setError("");
            setLoading(true);

            setupRecaptcha();

            const cleanPhone = normalizePhone(phone);
            console.log("Sending OTP →", cleanPhone);

            const confirmationResult = await signInWithPhoneNumber(
                auth,
                cleanPhone,
                window.recaptchaVerifier
            );

            setConfirmation(confirmationResult);
            setStep("OTP");

        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    /* VERIFY OTP */
    const verifyOtp = async () => {
        try {
            setError("");
            setLoading(true);

            if (!confirmation) {
                setError("Session expired. Please request OTP again.");
                return;
            }

            const result = await confirmation.confirm(otp);

            const token = await result.user.getIdToken();

            const res = await axios.post(
                apiUrl("/auth/firebase/verify"),
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (res.data.status === "LOGIN") {
                window.location.href = "/";
            } else {
                window.location.href = "/signup";
            }

        } catch (err) {
            console.error(err);

            if (err.code === "auth/invalid-verification-code") {
                setError("Invalid OTP");
            } else if (err.code === "auth/code-expired") {
                setError("OTP expired. Request a new one.");
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            {/* recaptcha container */}
            <div id="recaptcha-container"></div>

            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

                <h2 className="text-2xl font-bold text-center mb-6">
                    {step === "PHONE" ? "Login with Phone" : "Verify OTP"}
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                {step === "PHONE" && (
                    <>
                        <input
                            className="w-full border p-3 rounded mb-4"
                            placeholder="Enter phone (9370327415)"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <button
                            onClick={sendOtp}
                            disabled={loading}
                            className="w-full bg-black text-white p-3 rounded hover:bg-gray-800"
                        >
                            {loading ? "Sending OTP..." : "Send OTP"}
                        </button>
                    </>
                )}

                {step === "OTP" && (
                    <>
                        <input
                            className="w-full border p-3 rounded mb-4"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />

                        <button
                            onClick={verifyOtp}
                            disabled={loading}
                            className="w-full bg-black text-white p-3 rounded hover:bg-gray-800"
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </>
                )}

            </div>
        </div>
    );
}