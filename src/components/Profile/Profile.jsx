import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    FaUserCircle, FaEdit, FaHeart, FaCheckCircle,
    FaExclamationTriangle, FaPhone, FaEnvelope, FaUser,
    FaSignOutAlt, FaSave, FaTimes
} from "react-icons/fa";
import axios from "axios";
import { apiUrl } from "../../api/config.js";
import { getApiErrorMessage } from "../../api/errors.js";
import { fetchMe, updateProfile, requestEmailOtp, verifyEmailOtp } from "./Profileapi.js";
import { fetchFavourites } from "../../api/favourites.js";

function Profile() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [editMode, setEditMode] = useState(false);
    const [saving, setSaving] = useState(false);
    const [statusMsg, setStatusMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [profile, setProfile] = useState({
        first_name: "",
        last_name: "",
        email: "",
        is_verified: false,
    });

    const [favLoading, setFavLoading] = useState(false);
    const [favouriteIds, setFavouriteIds] = useState([]);
    const [favouriteEvents, setFavouriteEvents] = useState([]);

    const [otpEmail, setOtpEmail] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [otpLoading, setOtpLoading] = useState(false);

    useEffect(() => {
        if (!user) navigate("/auth");
    }, [user]);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            if (!user) return;
            setErrorMsg(""); setStatusMsg("");
            try {
                const token = await user.getIdToken();
                const me = await fetchMe(token);
                if (!mounted) return;
                setProfile({
                    first_name: me?.first_name ?? "",
                    last_name: me?.last_name ?? "",
                    email: me?.email ?? "",
                    is_verified: !!me?.is_verified,
                });
                setOtpEmail(me?.email ?? "");
            } catch (err) {
                if (mounted) setErrorMsg(getApiErrorMessage(err, "Failed to load profile"));
            }
        };
        load();
        return () => { mounted = false; };
    }, [user]);

    useEffect(() => {
        let mounted = true;
        const loadFavs = async () => {
            if (!user) return;
            setFavLoading(true);
            try {
                const token = await user.getIdToken();
                const ids = await fetchFavourites(token);
                if (!mounted) return;
                setFavouriteIds(Array.isArray(ids) ? ids : []);
                const events = await Promise.all(
                    (ids || []).slice(0, 50).map(async (id) => {
                        try {
                            const res = await axios.get(apiUrl(`/events/by-uuid/${id}`));
                            return res.data;
                        } catch { return null; }
                    })
                );
                if (!mounted) return;
                setFavouriteEvents(events.filter(Boolean));
            } finally {
                if (mounted) setFavLoading(false);
            }
        };
        loadFavs();
        return () => { mounted = false; };
    }, [user]);

    const handleLogout = async () => { await logout(); navigate("/"); };

    const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

    const handleSave = async () => {
        if (!user) return;
        setSaving(true); setErrorMsg(""); setStatusMsg("");
        try {
            const token = await user.getIdToken();
            const updated = await updateProfile(token, {
                first_name: profile.first_name,
                last_name: profile.last_name,
            });
            setProfile(prev => ({
                ...prev,
                first_name: updated?.first_name ?? prev.first_name,
                last_name: updated?.last_name ?? prev.last_name,
            }));
            setEditMode(false);
            setStatusMsg("Profile updated successfully.");
        } catch (err) {
            setErrorMsg(getApiErrorMessage(err, "Failed to save profile"));
        } finally {
            setSaving(false);
        }
    };

    const handleRequestOtp = async () => {
        if (!user) return;
        setOtpLoading(true); setErrorMsg(""); setStatusMsg("");
        try {
            const token = await user.getIdToken();
            const res = await requestEmailOtp(token, otpEmail);
            setStatusMsg(res?.message || "Verification code sent.");
        } catch (err) {
            setErrorMsg(getApiErrorMessage(err, "Failed to send verification code"));
        } finally { setOtpLoading(false); }
    };

    const handleVerifyOtp = async () => {
        if (!user) return;
        setOtpLoading(true); setErrorMsg(""); setStatusMsg("");
        try {
            const token = await user.getIdToken();
            const res = await verifyEmailOtp(token, { email: otpEmail, otp: otpCode });
            setProfile(prev => ({ ...prev, email: res?.email ?? otpEmail, is_verified: true }));
            setOtpCode("");
            setStatusMsg(res?.message || "Email verified.");
        } catch (err) {
            setErrorMsg(getApiErrorMessage(err, "Failed to verify code"));
        } finally { setOtpLoading(false); }
    };

    if (!user) return null;

    const displayName = (profile.first_name || profile.last_name)
        ? `${profile.first_name} ${profile.last_name}`.trim()
        : "Explorer";
    const initials = `${profile.first_name?.[0] ?? ""}${profile.last_name?.[0] ?? ""}`.toUpperCase();

    return (
        <div className="min-h-screen bg-[#0f172a] text-white">

            {/* ── Hero Banner ── */}
            <div className="relative h-56 sm:h-72 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
                    alt="Adventure banner"
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.38)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/30 to-[#0f172a]" />
                {/* page label top-right */}
                <div className="absolute top-6 right-8 hidden sm:flex items-center gap-2">
                    <span className="font-bebas text-2xl tracking-widest text-white/60 uppercase">
                        My Profile
                    </span>
                </div>
            </div>

            {/* ── Page body — padded for left sidebar ── */}
            <div className="pl-16 sm:pl-20 pr-4 sm:pr-8 pb-24">
                <div className="max-w-5xl mx-auto">

                    {/* ── Avatar row overlapping banner ── */}
                    <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-16 relative z-10">

                        {/* Avatar circle */}
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#1e293b] border-4 border-[#0f172a] shadow-2xl flex items-center justify-center shrink-0">
                            {initials
                                ? <span className="font-bebas text-4xl sm:text-5xl text-white tracking-wider select-none">{initials}</span>
                                : <FaUserCircle className="text-6xl text-gray-500" />
                            }
                        </div>

                        {/* Name block */}
                        <div className="flex-1 pb-2 min-w-0">
                            <h1 className="font-bebas text-3xl sm:text-4xl tracking-wider text-white leading-none">
                                {displayName}
                            </h1>
                            <div className="flex items-center gap-2 mt-1.5">
                                <FaPhone className="text-gray-500 text-xs" />
                                <p className="text-sm text-gray-400">{user.phoneNumber}</p>
                            </div>
                            <span className="inline-block mt-2 text-xs text-gray-500 uppercase tracking-widest border border-gray-700 rounded px-2 py-0.5">
                                Adventure Explorer
                            </span>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-3 pb-2 shrink-0">
                            {!editMode ? (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-600 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer"
                                >
                                    <FaEdit className="text-xs" /> Edit
                                </button>
                            ) : (
                                <>
                                    <button
                                        disabled={saving}
                                        onClick={handleSave}
                                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 transition-all duration-200 cursor-pointer"
                                    >
                                        <FaSave className="text-xs" />
                                        {saving ? "Saving..." : "Save"}
                                    </button>
                                    <button
                                        onClick={() => setEditMode(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-600 bg-white/5 text-gray-300 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                                    >
                                        <FaTimes className="text-xs" /> Cancel
                                    </button>
                                </>
                            )}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all duration-200 cursor-pointer"
                            >
                                <FaSignOutAlt className="text-xs" /> Logout
                            </button>
                        </div>
                    </div>

                    {/* ── Divider ── */}
                    <div className="h-px bg-gray-800 mt-6 mb-6" />

                    {/* ── Toast messages ── */}
                    {(statusMsg || errorMsg) && (
                        <div className="mb-6 space-y-2">
                            {statusMsg && (
                                <div className="flex items-center gap-2.5 text-sm bg-green-500/10 border border-green-500/20 text-green-300 rounded-lg px-4 py-3">
                                    <FaCheckCircle className="shrink-0" /> {statusMsg}
                                </div>
                            )}
                            {errorMsg && (
                                <div className="flex items-center gap-2.5 text-sm bg-red-500/10 border border-red-500/20 text-red-300 rounded-lg px-4 py-3">
                                    <FaExclamationTriangle className="shrink-0" /> {errorMsg}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── Two-column grid ── */}
                    <div className="grid lg:grid-cols-3 gap-6">

                        {/* ══ Left: Account Details (2/3) ══ */}
                        <div className="lg:col-span-2">
                            <div className="bg-[#1e293b] rounded-xl border border-gray-800 overflow-hidden">

                                {/* Card header */}
                                <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-3">
                                    <FaUser className="text-gray-500 text-sm" />
                                    <span className="font-semibold text-sm text-gray-200 tracking-wide uppercase">Account Details</span>
                                </div>

                                <div className="divide-y divide-gray-800">

                                    {/* Phone */}
                                    <InfoRow
                                        icon={<FaPhone />}
                                        label="Phone"
                                        value={user.phoneNumber || "—"}
                                        locked
                                    />

                                    {/* First Name */}
                                    <div className="flex items-center px-6 py-4 gap-4">
                                        <FaUser className="text-gray-600 text-sm shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">First Name</p>
                                            {editMode ? (
                                                <input
                                                    name="first_name"
                                                    value={profile.first_name}
                                                    onChange={handleChange}
                                                    placeholder="Enter first name"
                                                    className="w-full bg-[#020617] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-gray-500 transition-colors"
                                                />
                                            ) : (
                                                <p className="text-sm text-gray-200">{profile.first_name || <Placeholder />}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Last Name */}
                                    <div className="flex items-center px-6 py-4 gap-4">
                                        <FaUser className="text-gray-600 text-sm shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Last Name</p>
                                            {editMode ? (
                                                <input
                                                    name="last_name"
                                                    value={profile.last_name}
                                                    onChange={handleChange}
                                                    placeholder="Enter last name"
                                                    className="w-full bg-[#020617] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-gray-500 transition-colors"
                                                />
                                            ) : (
                                                <p className="text-sm text-gray-200">{profile.last_name || <Placeholder />}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-center px-6 py-4 gap-4">
                                        <FaEnvelope className="text-gray-600 text-sm shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
                                            <div className="flex items-center gap-3">
                                                <p className="text-sm text-gray-200 truncate flex-1">
                                                    {profile.email || <Placeholder />}
                                                </p>
                                                {profile.email && (
                                                    <span className={`shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full border ${profile.is_verified
                                                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                                        }`}>
                                                        {profile.is_verified ? "Verified" : "Unverified"}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* ══ Right: Email Verification (1/3) ══ */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#1e293b] rounded-xl border border-gray-800 overflow-hidden h-full">

                                {/* Card header */}
                                <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <FaEnvelope className="text-gray-500 text-sm" />
                                        <span className="font-semibold text-sm text-gray-200 tracking-wide uppercase">Email</span>
                                    </div>
                                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${profile.is_verified
                                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                        }`}>
                                        {profile.is_verified ? "Verified" : "Unverified"}
                                    </span>
                                </div>

                                <div className="p-6">
                                    {profile.is_verified ? (
                                        /* ── Verified state ── */
                                        <div className="flex flex-col items-center text-center gap-3 py-4">
                                            <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                                <FaCheckCircle className="text-xl text-green-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-200">Email Verified</p>
                                                <p className="text-xs text-gray-500 mt-1 break-all">{profile.email}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        /* ── Unverified — show form ── */
                                        <div className="space-y-4">
                                            <p className="text-xs text-gray-500 leading-relaxed">
                                                Verify your email to receive updates and secure your account.
                                            </p>

                                            {/* Email */}
                                            <div>
                                                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Email address</label>
                                                <input
                                                    value={otpEmail}
                                                    onChange={(e) => setOtpEmail(e.target.value)}
                                                    placeholder="you@example.com"
                                                    className="w-full bg-[#020617] border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-gray-500 transition-colors"
                                                />
                                            </div>

                                            <button
                                                type="button"
                                                disabled={otpLoading || !otpEmail}
                                                onClick={handleRequestOtp}
                                                className="w-full bg-white text-black rounded-lg py-2.5 text-sm font-semibold hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                            >
                                                {otpLoading ? "Sending..." : "Send OTP"}
                                            </button>

                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-px bg-gray-800" />
                                                <span className="text-xs text-gray-600">enter code</span>
                                                <div className="flex-1 h-px bg-gray-800" />
                                            </div>

                                            {/* OTP */}
                                            <div>
                                                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Verification code</label>
                                                <input
                                                    value={otpCode}
                                                    onChange={(e) => setOtpCode(e.target.value)}
                                                    placeholder="6-digit code"
                                                    className="w-full bg-[#020617] border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-gray-500 transition-colors"
                                                />
                                            </div>

                                            <button
                                                type="button"
                                                disabled={otpLoading || !otpEmail || !otpCode}
                                                onClick={handleVerifyOtp}
                                                className="w-full bg-green-600 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                            >
                                                {otpLoading ? "Verifying..." : "Verify Email"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ══ Favourites Section ══ */}
                    <div className="mt-10">
                        <div className="flex items-center gap-4 mb-6">
                            <FaHeart className="text-gray-600" />
                            <h2 className="font-bebas text-2xl tracking-widest text-white uppercase">
                                Favourite Adventures
                            </h2>
                            {favouriteIds.length > 0 && (
                                <span className="ml-auto text-xs text-gray-500 border border-gray-700 rounded px-2 py-0.5">
                                    {favouriteIds.length} saved
                                </span>
                            )}
                        </div>

                        {favLoading ? (
                            <div className="flex items-center gap-3 text-gray-500 text-sm py-8">
                                <div className="w-4 h-4 border-2 border-gray-700 border-t-gray-400 rounded-full animate-spin" />
                                Loading favourites...
                            </div>
                        ) : favouriteIds.length === 0 ? (
                            <div className="bg-[#1e293b] rounded-xl border border-gray-800 py-14 px-6 text-center">
                                <FaHeart className="mx-auto text-3xl text-gray-700 mb-4" />
                                <p className="text-gray-400 text-sm">No favourites yet</p>
                                <p className="text-gray-600 text-xs mt-1">Explore adventures and save the ones you love</p>
                                <a
                                    href="/"
                                    className="inline-block mt-5 text-xs text-gray-400 border border-gray-700 rounded-lg px-4 py-2 hover:border-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    Explore now
                                </a>
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {favouriteEvents.map((ev) => (
                                    <a
                                        key={ev.event_uuid ?? ev.id}
                                        href={`/eventDetails/${ev.id}`}
                                        className="group bg-[#1e293b] rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300 block overflow-hidden"
                                    >
                                        {/* Cover image */}
                                        <div className="aspect-[16/9] overflow-hidden bg-[#020617] relative">
                                            <img
                                                src={ev.cover_image_url}
                                                alt={ev.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                style={{ filter: "brightness(0.85)" }}
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b]/80 to-transparent" />
                                            {/* Heart badge */}
                                            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center border border-white/10">
                                                <FaHeart className="text-xs text-red-400" />
                                            </div>
                                        </div>
                                        {/* Info */}
                                        <div className="p-4">
                                            <p className="text-sm font-semibold text-white line-clamp-1 group-hover:text-gray-200 transition-colors">
                                                {ev.title}
                                            </p>
                                            <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                                                {ev.short_description}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

/* ── Small helper components ── */
function InfoRow({ icon, label, value, locked }) {
    return (
        <div className="flex items-center px-6 py-4 gap-4">
            <span className="text-gray-600 text-sm shrink-0">{icon}</span>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</p>
                <p className="text-sm text-gray-200">{value}</p>
            </div>
            {locked && (
                <span className="shrink-0 text-xs text-gray-700 border border-gray-800 rounded px-1.5 py-0.5">locked</span>
            )}
        </div>
    );
}

function Placeholder() {
    return <span className="text-gray-600 italic">Not set</span>;
}

export default Profile;