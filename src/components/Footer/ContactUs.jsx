// src/components/Footer/ContactUs.jsx
import React from "react";
import PolicyLayout from "./PolicyLayout";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
    return (
        <PolicyLayout title="Connect">
            {/* Business Identity for Razorpay Verification */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
                <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800">
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-6">Legal Identity</h4>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Business Name</p>
                            <p className="text-white font-medium">Living The Adventure Pvt. Ltd.</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">GSTIN</p>
                            <p className="text-white font-medium">29AABCT1234A1ZM</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">CIN</p>
                            <p className="text-white font-medium">U63040KA2020PTC123456</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800">
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-6">Registered Address</h4>
                    <div className="flex gap-4">
                        <FaMapMarkerAlt className="text-green-500 mt-1" />
                        <p className="text-gray-300 leading-relaxed">
                            123 Adventure Lane, MG Road,<br />
                            Bangalore, Karnataka 560001,<br />
                            India
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Methods */}
            <div className="grid sm:grid-cols-2 gap-8">
                <a href="mailto:info@livingtheadventure.com" className="group p-8 rounded-2xl bg-black border border-gray-800 hover:border-green-500 transition-all duration-500">
                    <FaEnvelope className="text-gray-500 group-hover:text-green-500 transition-colors mb-4" />
                    <h3 className="text-white font-medium mb-2">Email Us</h3>
                    <p className="text-gray-500 text-sm">info@livingtheadventure.com</p>
                </a>

                <a href="tel:+919876543210" className="group p-8 rounded-2xl bg-black border border-gray-800 hover:border-green-500 transition-all duration-500">
                    <FaPhone className="text-gray-500 group-hover:text-green-500 transition-colors mb-4" />
                    <h3 className="text-white font-medium mb-2">Call Us</h3>
                    <p className="text-gray-500 text-sm">+91 98765 43210</p>
                </a>
            </div>
        </PolicyLayout>
    );
};

export default ContactUs;
