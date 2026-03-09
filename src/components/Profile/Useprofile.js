import { useState, useEffect, useCallback } from "react";
import { fetchMe, updateProfile, requestEmailOtp, verifyEmailOtp } from "./Profileapi";

export function useProfile(user) {
    const [profile, setProfile] = useState({ first_name: "", last_name: "", email: "", phone: "" });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const [emailDraft, setEmailDraft] = useState("");
    const [otpStep, setOtpStep] = useState("idle"); // idle|sending|awaiting|verifying|done
    const [otpValue, setOtpValue] = useState("");
    const [otpError, setOtpError] = useState(null);

    const load = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const token = await user.getIdToken();
            const data = await fetchMe(token);
            if (data) {
                setProfile({
                    first_name: data.first_name ?? "",
                    last_name: data.last_name ?? "",
                    email: data.email ?? "",
                    phone: data.phone ?? user.phoneNumber ?? "",
                });
                setEmailDraft(data.email ?? "");
            }
        } catch (err) {
            console.error("[useProfile] load failed:", err.message);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => { load(); }, [load]);

    const handleSave = useCallback(async () => {
        if (!user) return;
        setSaving(true);
        setSaveError(null);
        try {
            const token = await user.getIdToken();
            const updated = await updateProfile(token, {
                first_name: profile.first_name,
                last_name: profile.last_name,
            });
            setProfile(prev => ({
                ...prev,
                first_name: updated.first_name ?? prev.first_name,
                last_name: updated.last_name ?? prev.last_name,
            }));
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err) {
            setSaveError(err.response?.data?.detail ?? "Failed to save. Try again.");
        } finally {
            setSaving(false);
        }
    }, [user, profile.first_name, profile.last_name]);

    const handleRequestOtp = useCallback(async () => {
        if (!user || !emailDraft) return;
        setOtpStep("sending");
        setOtpError(null);
        try {
            const token = await user.getIdToken();
            await requestEmailOtp(token, emailDraft);
            setOtpValue("");
            setOtpStep("awaiting");
        } catch (err) {
            setOtpError(err.response?.data?.detail ?? "Failed to send OTP.");
            setOtpStep("idle");
        }
    }, [user, emailDraft]);

    const handleVerifyOtp = useCallback(async () => {
        if (!user || !otpValue) return;
        setOtpStep("verifying");
        setOtpError(null);
        try {
            const token = await user.getIdToken();
            await verifyEmailOtp(token, { email: emailDraft, otp: otpValue });
            setProfile(prev => ({ ...prev, email: emailDraft }));
            setOtpStep("done");
            setTimeout(() => setOtpStep("idle"), 3000);
        } catch (err) {
            setOtpError(err.response?.data?.detail ?? "Invalid OTP. Try again.");
            setOtpStep("awaiting");
        }
    }, [user, emailDraft, otpValue]);

    const handleCancelOtp = useCallback(() => {
        setOtpStep("idle");
        setOtpValue("");
        setOtpError(null);
        setEmailDraft(profile.email);
    }, [profile.email]);

    return {
        profile, setProfile,
        loading, saving, saveError, saveSuccess,
        handleSave,
        emailDraft, setEmailDraft,
        otpStep, otpValue, setOtpValue,
        otpError,
        handleRequestOtp,
        handleVerifyOtp,
        handleCancelOtp,
    };
}