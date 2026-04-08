// src/components/PolicyLayout.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "./Footer";
import Logo from "../Common/Logo/logo";

const PolicyLayout = ({ children, title }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-green-500 selection:text-black">
            {/* Minimalist Navigation */}
            <nav className="px-6 py-6 flex items-center justify-between max-w-7xl mx-auto w-full">
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-2 text-gray-500 hover:text-white transition-all duration-300"
                >
                    <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm uppercase tracking-widest font-medium">Back</span>
                </button>

                <Logo />

                <div className="w-10"></div> {/* Balance spacer */}
            </nav>

            {/* Hero Section */}
            <header className="max-w-4xl mx-auto px-6 py-20 text-center">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                    {title}
                </h1>
                <div className="w-12 h-px bg-green-500 mx-auto"></div>
            </header>

            {/* Content Area */}
            <main className="flex-grow max-w-3xl mx-auto px-6 pb-24 w-full">
                <div className="space-y-12">
                    {children}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PolicyLayout;
