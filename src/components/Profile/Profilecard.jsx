import { useState } from "react";
import {
    FaUserCircle, FaEdit, FaSignOutAlt,
    FaSave, FaTimes, FaCamera, FaHeart, FaMountain, FaLock,
} from "react-icons/fa";
import { MdExplore, MdStar } from "react-icons/md";
import { useProfile } from "./Useprofile";
import { EmailOtpPanel } from "./Emailotppanel";

export function ProfileCard({ user, onLogout, savedCount }) {
    const [editMode, setEditMode] = useState(false);
    const [showEmailPanel, setShowEmailPanel] = useState(false);

    const {
        profile, setProfile,
        loading, saving, saveError, saveSuccess,
        handleSave,
        emailDraft, setEmailDraft,
        otpStep, otpValue, setOtpValue,
        otpError,
        handleRequestOtp, handleVerifyOtp, handleCancelOtp,
    } = useProfile(user);

    const displayName = profile.first_name || profile.last_name
        ? `${profile.first_name} ${profile.last_name}`.trim()
        : "Adventure Explorer";

    const stats = [
        { icon: <FaMountain />, label: "Treks", value: "0" },
        { icon: <FaHeart />, label: "Saved", value: String(savedCount) },
        { icon: <MdStar />, label: "Reviews", value: "0" },
        { icon: <MdExplore />, label: "Countries", value: "0" },
    ];

    const inputStyle = {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#e2e8f0",
    };
    const focusGreen = (e) => (e.target.style.borderColor = "rgba(52,211,153,0.5)");
    const blurGrey = (e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)");

    const handleSaveAndClose = async () => {
        await handleSave();
        setEditMode(false);
        setShowEmailPanel(false);
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setShowEmailPanel(false);
        handleCancelOtp();
    };

    if (loading) {
        return (
            <div className="rounded-2xl border border-white/10 p-8 mb-6 animate-pulse"
                style={{ background: "rgba(30,41,59,0.95)", minHeight: 200 }}>
                <div className="flex gap-6 items-center">
                    <div className="w-24 h-24 rounded-2xl bg-slate-700/50" />
                    <div className="flex-1 space-y-3">
                        <div className="h-5 bg-slate-700/50 rounded w-1/3" />
                        <div className="h-3 bg-slate-700/30 rounded w-1/4" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="rounded-2xl border border-white/10 p-6 sm:p-8 mb-6"
            style={{
                background: "linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.98) 100%)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
            }}
        >
            {/* ── Top row ── */}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">

                {/* Avatar */}
                <div className="relative flex-shrink-0">
                    <div
                        className="w-24 h-24 rounded-2xl flex items-center justify-center relative overflow-hidden"
                        style={{
                            background: "linear-gradient(135deg, #1e3a5f 0%, #0f2240 100%)",
                            border: "2px solid rgba(52,211,153,0.3)",
                            boxShadow: "0 0 30px rgba(52,211,153,0.1)",
                        }}
                    >
                        <FaUserCircle className="text-5xl text-slate-400" />
                        <button
                            className="absolute bottom-0 inset-x-0 h-8 flex items-center justify-center text-xs text-white/70 hover:text-white transition-colors"
                            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
                        >
                            <FaCamera className="mr-1 text-xs" /> Edit
                        </button>
                    </div>
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0f172a]" />
                </div>

                {/* Name + badge */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h2 className="text-2xl font-bold tracking-tight truncate">{displayName}</h2>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                            style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.3)", color: "#34d399" }}>
                            Explorer
                        </span>
                    </div>
                    <p className="text-sm text-slate-400">{profile.phone || user.phoneNumber || "No phone"}</p>
                    {profile.email && !editMode && (
                        <p className="text-xs text-slate-500 mt-0.5">{profile.email}</p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 flex-shrink-0">
                    {!editMode && (
                        <button onClick={() => setEditMode(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#94a3b8" }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                        >
                            <FaEdit className="text-xs" /> Edit Profile
                        </button>
                    )}
                    <button onClick={onLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.18)"}
                        onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
                    >
                        <FaSignOutAlt className="text-xs" /> Logout
                    </button>
                </div>
            </div>

            {/* ── Stats ── */}
            <div className="grid grid-cols-4 gap-3 mt-8">
                {stats.map((s, i) => (
                    <div key={i}
                        className="rounded-xl p-4 text-center transition-all duration-200 hover:scale-105 cursor-default"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                        <div className="text-slate-400 flex justify-center mb-2 text-lg">{s.icon}</div>
                        <div className="text-2xl font-bold text-white">{s.value}</div>
                        <div className="text-xs text-slate-500 mt-0.5 uppercase tracking-wider">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* ── Edit form ── */}
            {editMode && (
                <div className="mt-8 pt-6 border-t border-white/10 space-y-5">
                    <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
                        Personal Information
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Phone — locked */}
                        <div>
                            <label className="block text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wider">
                                Phone Number
                            </label>
                            <div className="px-4 py-2.5 rounded-xl text-slate-500 text-sm flex items-center gap-2"
                                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <FaLock className="text-xs text-slate-600" />
                                {profile.phone || user.phoneNumber || "—"}
                            </div>
                            <p className="text-xs text-slate-600 mt-1">Phone number cannot be changed</p>
                        </div>

                        {/* First name */}
                        <div>
                            <label className="block text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wider">
                                First Name
                            </label>
                            <input
                                value={profile.first_name}
                                onChange={e => setProfile(p => ({ ...p, first_name: e.target.value }))}
                                placeholder="First name"
                                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                                style={inputStyle} onFocus={focusGreen} onBlur={blurGrey}
                            />
                        </div>

                        {/* Last name */}
                        <div>
                            <label className="block text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wider">
                                Last Name
                            </label>
                            <input
                                value={profile.last_name}
                                onChange={e => setProfile(p => ({ ...p, last_name: e.target.value }))}
                                placeholder="Last name"
                                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                                style={inputStyle} onFocus={focusGreen} onBlur={blurGrey}
                            />
                        </div>

                        {/* Email — display + Change button */}
                        {!showEmailPanel && (
                            <div>
                                <label className="block text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wider">
                                    Email Address
                                </label>
                                <div className="flex gap-2 items-center">
                                    <div className="flex-1 px-4 py-2.5 rounded-xl text-sm text-slate-300 truncate"
                                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                                        {profile.email || "Not set"}
                                    </div>
                                    <button
                                        onClick={() => setShowEmailPanel(true)}
                                        className="flex-shrink-0 px-3 py-2.5 rounded-xl text-xs font-medium transition-all"
                                        style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)", color: "#34d399" }}
                                        onMouseEnter={e => e.currentTarget.style.background = "rgba(52,211,153,0.18)"}
                                        onMouseLeave={e => e.currentTarget.style.background = "rgba(52,211,153,0.1)"}
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Email OTP panel */}
                    {showEmailPanel && (
                        <EmailOtpPanel
                            emailDraft={emailDraft}
                            setEmailDraft={setEmailDraft}
                            otpStep={otpStep}
                            otpValue={otpValue}
                            setOtpValue={setOtpValue}
                            otpError={otpError}
                            onRequestOtp={handleRequestOtp}
                            onVerifyOtp={handleVerifyOtp}
                            onCancel={() => { setShowEmailPanel(false); handleCancelOtp(); }}
                            currentEmail={profile.email}
                        />
                    )}

                    {saveError && <p className="text-xs text-red-400">{saveError}</p>}

                    {/* Save / Cancel */}
                    <div className="flex gap-3">
                        <button onClick={handleSaveAndClose} disabled={saving}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                            style={{
                                background: saving ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #059669, #047857)",
                                boxShadow: saving ? "none" : "0 4px 20px rgba(5,150,105,0.35)",
                                color: saving ? "#64748b" : "white",
                                cursor: saving ? "not-allowed" : "pointer",
                            }}
                            onMouseEnter={e => { if (!saving) e.currentTarget.style.transform = "translateY(-1px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                        >
                            <FaSave className="text-xs" />
                            {saving ? "Saving…" : "Save Changes"}
                        </button>
                        <button onClick={handleCancelEdit}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8" }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
                            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                        >
                            <FaTimes className="text-xs" /> Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Success toast */}
            {saveSuccess && (
                <div className="mt-4 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
                    style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", color: "#34d399" }}>
                    <MdStar /> Profile updated successfully!
                </div>
            )}
        </div>
    );
}