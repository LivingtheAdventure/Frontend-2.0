import { useState } from "react";
import axios from "axios";
import { auth } from "./firebase";

export default function SignupForm() {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
    });

    const submit = async () => {
        const token = await auth.currentUser.getIdToken();

        const res = await axios.post(
            "http://localhost:8000/auth/signup/complete",
            form,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        alert("Signup complete");
        console.log(res.data);
    };

    return (
        <>
            <h3>Complete Profile</h3>

            <input
                placeholder="First name"
                onChange={(e) =>
                    setForm({ ...form, first_name: e.target.value })
                }
            />

            <input
                placeholder="Last name"
                onChange={(e) =>
                    setForm({ ...form, last_name: e.target.value })
                }
            />

            <input
                placeholder="Email"
                onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                }
            />

            <button onClick={submit}>Continue</button>
        </>
    );
}
