// src/components/Footer/PrivacyPolicy.jsx
import React from "react";
import PolicyLayout from "./PolicyLayout";

const PrivacyPolicy = () => {
    const sections = [
        {
            title: "Information Collection",
            content: "We collect only what is essential for your adventure. This includes personal identity for permits, health declarations for safety, and payment details for bookings.",
            items: ["Full Name & Contact", "Government ID", "Medical Fitness Level", "Emergency Contact"]
        },
        {
            title: "Data Usage",
            content: "Your data is used exclusively to organize your trip, verify your identity with forest departments, and process secure payments.",
            items: ["Booking Management", "Safety Verifications", "Payment Processing"]
        },
        {
            title: "Security Protocol",
            content: "We utilize industry-leading encryption. All payment data is handled by Razorpay and never touches our local servers.",
            items: ["SSL Encryption", "PCI DSS Compliance", "Encrypted Storage"]
        }
    ];

    return (
        <PolicyLayout title="Privacy Policy">
            <p className="text-gray-500 text-center mb-16 text-sm uppercase tracking-widest">
                Last Updated: January 2025
            </p>

            {sections.map((sec, i) => (
                <section key={i} className="group border-t border-gray-800 pt-8">
                    <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-green-400 transition-colors">
                        {sec.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-6">{sec.content}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {sec.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-sm text-gray-500">
                                <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                                {item}
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            <div className="mt-20 p-8 bg-gray-900/50 rounded-2xl border border-gray-800 text-center">
                <p className="text-gray-400 text-sm">For any privacy concerns, contact us at</p>
                <a href="mailto:privacy@livingtheadventure.com" className="text-white font-medium hover:text-green-400 transition-colors">
                    privacy@livingtheadventure.com
                </a>
            </div>
        </PolicyLayout>
    );
};

export default PrivacyPolicy;
