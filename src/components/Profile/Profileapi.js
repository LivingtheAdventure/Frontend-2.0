import axios from "axios";

const API_BASE = "http://localhost:8000";

const authHeaders = (token) => ({
    Authorization: `Bearer ${token}`,
});

export async function fetchMe(token) {
    const res = await axios.get(`${API_BASE}/auth/me`, {
        headers: authHeaders(token),
    });
    return res.data;
}

export async function updateProfile(token, { first_name, last_name }) {
    const res = await axios.put(
        `${API_BASE}/auth/me`,
        { first_name, last_name },
        { headers: authHeaders(token) }
    );
    return res.data;
}

export async function requestEmailOtp(token, email) {
    const res = await axios.post(
        `${API_BASE}/auth/me/request-email-otp`,
        { email },
        { headers: authHeaders(token) }
    );
    return res.data;
}

export async function verifyEmailOtp(token, { email, otp }) {
    const res = await axios.post(
        `${API_BASE}/auth/me/verify-email-otp`,
        { email, otp },
        { headers: authHeaders(token) }
    );
    return res.data;
}