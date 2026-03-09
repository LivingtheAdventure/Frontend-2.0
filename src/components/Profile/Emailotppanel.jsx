import { useRef, useEffect } from "react";
import { FaTimes, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { MdSend } from "react-icons/md";

export function EmailOtpPanel({
    emailDraft, setEmailDraft,
    otpStep, otpValue, setOtpValue,
    otpError,
    onRequestOtp, onVerifyOtp, onCancel,
    currentEmail,
}) {
    const otpInputRef = useRef(null);

    useEffect(() => {
        if (otpStep === "awaiting" && otpInputRef.current) {
            otpInputRef.current.focus();
        }
    }, [otpStep]);

    const inputBase = {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#e2e8f0",
    };
    const focusGreen = (e) => (e.target.style.borderColor = "rgba(52,211,153,0.5)");
    const blurGrey = (e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)");

    if (otpStep === "done") {
        return (
            <div
                className="rounded-xl px-4 py-3 flex items-center gap-3 text-sm"
                style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.25)", color: "#34d399" }}
            >
                <FaCheckCircle className="text-lg flex-shrink-0" />
                <span>Email updated to <strong>{emailDraft}</strong></span>
            </div>
        );
    }

    return (
        <div
            className="rounded-xl p-4 space-y-4"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)" }}
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <FaEnvelope className="text-emerald-400" /> Change Email
                </div>
                <button onClick={onCancel} className="text-slate-500 hover:text-slate-300 transition-colors">
                    <FaTimes className="text-sm" />
                </button>
            </div>

            {/* Step 1 — enter email */}
            {(otpStep === "idle" || otpStep === "sending") && (
                <div className="space-y-3">
                    <div>
                        <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider font-medium">
                            New Email Address
                        </label>
                        <input
                            type="email"
                            value={emailDraft}
                            onChange={(e) => setEmailDraft(e.target.value)}
                            placeholder={currentEmail || "your@email.com"}
                            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                            style={inputBase}
                            onFocus={focusGreen}
                            onBlur={blurGrey}
                            disabled={otpStep === "sending"}
                        />
                        {currentEmail && (
                            <p className="text-xs text-slate-600 mt-1">Current: {currentEmail}</p>
                        )}
                    </div>
                    {otpError && <p className="text-xs text-red-400">{otpError}</p>}
                    <button
                        onClick={onRequestOtp}
                        disabled={!emailDraft || otpStep === "sending"}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold w-full justify-center transition-all"
                        style={{
                            background: (!emailDraft || otpStep === "sending") ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #059669, #047857)",
                            color: (!emailDraft || otpStep === "sending") ? "#64748b" : "white",
                            cursor: (!emailDraft || otpStep === "sending") ? "not-allowed" : "pointer",
                        }}
                    >
                        <MdSend />
                        {otpStep === "sending" ? "Sending…" : "Send Verification Code"}
                    </button>
                </div>
            )}

            {/* Step 2 — enter OTP */}
            {(otpStep === "awaiting" || otpStep === "verifying") && (
                <div className="space-y-3">
                    <p className="text-xs text-slate-400">
                        A 6-digit code was sent to{" "}
                        <span className="text-emerald-400 font-medium">{emailDraft}</span>.
                    </p>
                    <div className="flex justify-center">
                        <input
                            ref={otpInputRef}
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={otpValue}
                            onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, "").slice(0, 6))}
                            placeholder="000000"
                            className="w-44 text-center text-2xl font-bold px-4 py-3 rounded-xl outline-none"
                            style={{ ...inputBase, letterSpacing: "0.4em" }}
                            onFocus={focusGreen}
                            onBlur={blurGrey}
                            disabled={otpStep === "verifying"}
                        />
                    </div>
                    {otpError && <p className="text-xs text-red-400 text-center">{otpError}</p>}
                    <div className="flex gap-2">
                        <button
                            onClick={onVerifyOtp}
                            disabled={otpValue.length < 6 || otpStep === "verifying"}
                            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                            style={{
                                background: (otpValue.length < 6 || otpStep === "verifying") ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #059669, #047857)",
                                color: (otpValue.length < 6 || otpStep === "verifying") ? "#64748b" : "white",
                                cursor: (otpValue.length < 6 || otpStep === "verifying") ? "not-allowed" : "pointer",
                            }}
                        >
                            {otpStep === "verifying" ? "Verifying…" : "Verify & Update Email"}
                        </button>
                        <button
                            onClick={onRequestOtp}
                            disabled={otpStep === "verifying"}
                            className="px-3 py-2.5 rounded-xl text-xs text-slate-500 hover:text-slate-300 transition-colors"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                        >
                            Resend
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}