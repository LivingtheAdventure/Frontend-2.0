// src/pages/TermsAndConditions.jsx
import React from "react";
import PolicyLayout from "./PolicyLayout";

const TermsAndConditions = () => {
    return (
        <PolicyLayout title="Terms & Conditions">
            <div className="text-gray-300 space-y-6">
                <p className="text-sm text-gray-500">
                    Last Updated: January 15, 2025 | Effective Date: January 15, 2025
                </p>

                <section>
                    <h3 className="text-xl font-semibold text-green-400 mb-3">1. Acceptance of Terms</h3>
                    <p>
                        By accessing and using <span className="text-green-400 font-semibold">TrekZone Adventures Pvt. Ltd.</span>
                        {"'"}s website and services, you agree to be bound by these Terms & Conditions.
                        If you do not agree with any part of these terms, please do not use our services.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-green-400 mb-3">2. Definitions</h3>
                    <div className="bg-gray-800 p-4 rounded-lg space-y-2">
                        <p><span className="text-white font-medium">"Company"</span> refers to TrekZone Adventures Pvt. Ltd.</p>
                        <p><span className="text-white font-medium">"Services"</span> refers to trek booking, adventure activities, trip planning, and related services.</p>
                        <p><span className="text-white font-medium">"User"</span> refers to any individual accessing our platform.</p>
                        <p><span className="text-white font-medium">"Event"</span> refers to any trek, trip, or adventure activity listed on our platform.</p>
                        <p><span className="text-white font-medium">"Participant"</span> refers to any individual registered for an event.</p>
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-green-400 mb-3">3. Eligibility</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>Users must be at least 18 years old to create an account and make bookings</li>
                        <li>Minors may participate only with adult supervision and consent</li>
                        <li>Users must provide accurate and complete registration information</li>
                        <li>Users must have valid government-issued ID for verification</li>
                        <li>Users must be physically fit for chosen adventure activities (as declared)</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-green-400 mb-3">4. Account Registration</h3>
                    <p className="mb-3">When creating an account, you agree to:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>Provide accurate, current, and complete information</li>
                        <li>Maintain the security of your password and account credentials</li>
                        <li>Accept responsibility for all activities under your account</li>
                        <li>Notify us immediately of any unauthorized access or security breach</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-green-400 mb-3">5. Booking & Payments</h3>
                    <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-medium mb-2">5.1 Booking Process</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-400">
                                <li>All bookings are subject to availability</li>
                                <li>Bookings are confirmed only upon successful payment</li>
                                <li>A confirmation email/SMS will be sent within 24 hours</li>
                                <li>Valid ID proof is mandatory at the time of event</li>
                            </ul>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-medium mb-2">5.2 Pricing</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-400">
                                <li>All prices are listed in Indian Rupees (INR)</li>
                                <li>Prices include applicable taxes unless stated otherwise</li>
                                <li>Prices are subject to change without prior notice</li>
                                <li>Dynamic pricing may apply during peak seasons</li>
                            </ul>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-medium mb-2">5.3 Payment Methods</h4>
                            <p className="text-gray-400">
                                We accept payments via Razorpay gateway including Credit Cards, Debit Cards,
                                UPI, Net Banking, and Wallets. All payments are processed securely.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-green-400 mb-3">6. Cancellation & Refunds</h3>
                    <p className="mb-3">
                        Detailed cancellation and refund policies are available in our{" "}
                        <a href="/refund-policy" className="text-green-400 hover:underline">
                            Refund, Return & Cancellation Policy
                        </a>{" "}
                        page. Key highlights:
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-green-600 text-black">
                                    <th className="p-3 text-left">Cancellation Time</th>
                                    <th className="p-3 text-left">Refund Amount</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300">
                                <tr className="border-b border-gray-700">
                                    <td className="p-3">More than 15 days before</td>
                                    <td className="p-3 text-green-400">90% refund</td>
                                </tr>
                                <tr className="border-b border-gray-700">
                                    <td className="p-3">7-15 days before</td>
                                    <td className="p-3 text-yellow-400">50% refund</td>
                                </tr>
                                <tr className="border-b border-gray-700">
                                    <td className="p-3">3-7 days before</td>
                                    <td className="p-3 text-orange-400">25% refund</td>
                                </tr>
                                <tr className="border-b border-gray-700">
                                    <td className="p-3">Less than 3 days</td>
                                    <td className="p-3 text-red-400">No refund</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-3 text-gray-400">
                        Refunds will be processed within 5-7 business days to the original payment method.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-green-400 mb-3">7. Participant Responsibilities</h3>
                    <div className="space-y-3">
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-medium mb-2">7.1 Health & Fitness</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-400">
                                <li>Participants must disclose any medical conditions before booking</li>
                                <li>Participants must be physically fit for the chosen activity level</li>
                                <li>Medical clearance may be required for certain activities</li>
                            </ul>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-medium mb-2">7.2 Code of Conduct</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-400">
                                <li>Follow instructions from guides and organizers</li>
                                <li>Respect local culture, environment, and wildlife</li>
                                <li>No littering or damage to natural surroundings</li>
                                <li>Maintain group discipline and safety protocols</li>
                                <li>Refrain from alcohol/drugs during adventure activities</li>
                            </ul>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-medium mb-2">7.3 Personal Belongings</h4>
                            <p className="text-gray-400">
                                The Company is not responsible for loss or damage to personal belongings.
                                Participants are advised to carry travel insurance for valuables.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-green-400 mb-3">8. Risk Acknowledgment & Liability Waiver</h3>
                    <div className="bg-red-900/30 border border-red-500 p-4 rounded-lg">
                        <p className="text-red-300 font-medium mb-3">⚠️ IMPORTANT - READ CAREFULLY</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            <li>Adventure activities carry inherent risks including but not limited to injury, accidents, and unforeseen natural events</li>
                            <li>By participating, you acknowledge these risks and participate voluntarily</li>
                            <li>The Company, its employees, and partners shall not be liable for any injuries, losses, or damages arising from participation</li>
                            <li>Participants must sign a liability waiver before certain activities</li>
                            <li>Travel insurance is strongly recommended for all participants</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-green-400 mb-3">9. Force Majeure</h3>
                    <p>
                        The Company shall not be liable for any failure or delay in performing obligations
                        due to circumstances beyond reasonable control, including but not limited to:
                        natural disasters, pandemics, government actions, strikes, weather conditions,
                        or any other unforeseen events. In such cases, rescheduling or credit vouchers
                        may be offered at the Company's discretion.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-green-400 mb-3">10. Intellectual Property</h3>
                    <p>
                        All content on this website, including logos, text, images, graphics, and software,
                        is the property of TrekZone Adventures Pvt. Ltd. and is protected by copyright and
                        intellectual property laws. Unauthorized use is strictly prohibited.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-green-400 mb-3">11. User Content</h3>
                    <p className="mb-2">By submitting reviews, photos, or feedback, you grant the Company:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                        <li>A non-exclusive, royalty-free license to use, modify, and display such content</li>
                        <li>The right to use content for marketing and promotional purposes</li>
                        <li>Confirmation that you own the rights to submitted content</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-green-400 mb-3">12. Privacy</h3>
                    <p>
                        Your use of our services is governed by our{" "}
                        <a href="/privacy-policy" className="text-green-400 hover:underline">
                            Privacy Policy
                        </a>
                        . Please review it to understand our data collection and usage practices.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-green-400 mb-3">13. Dispute Resolution</h3>
                    <div className="space-y-3">
                        <p>
                            Any disputes arising from these terms shall be resolved through the following process:
                        </p>
                        <ol className="list-decimal list-inside space-y-2 text-gray-400">
                            <li>Direct negotiation between parties</li>
                            <li>Mediation through a neutral third party</li>
                            <li>Arbitration in accordance with Indian Arbitration laws</li>
                            <li>Jurisdiction: Courts in Bangalore, Karnataka, India</li>
                        </ol>
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-green-400 mb-3">14. Modifications to Terms</h3>
                    <p>
                        We reserve the right to modify these Terms & Conditions at any time. Changes will be
                        effective immediately upon posting. Continued use of our services after changes
                        constitutes acceptance of the modified terms.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-green-400 mb-3">15. Severability</h3>
                    <p>
                        If any provision of these Terms is found to be unenforceable, the remaining provisions
                        shall continue in full force and effect.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-green-400 mb-3">16. Contact Information</h3>
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <p className="mb-2"><strong className="text-white">For bookings and general inquiries:</strong></p>
                        <p className="text-gray-400">Email: info@trekzone.com</p>
                        <p className="text-gray-400">Phone: +91 98765 43210</p>
                        <p className="mt-3 mb-2"><strong className="text-white">For legal matters:</strong></p>
                        <p className="text-gray-400">Email: legal@trekzone.com</p>
                        <p className="mt-3 mb-2"><strong className="text-white">Registered Address:</strong></p>
                        <p className="text-gray-400">TrekZone Adventures Pvt. Ltd.</p>
                        <p className="text-gray-400">123 Adventure Lane, MG Road</p>
                        <p className="text-gray-400">Bangalore, Karnataka 560001, India</p>
                        <p className="text-gray-400 mt-2">GSTIN: 29AABCT1234A1ZM | CIN: U63040KA2020PTC123456</p>
                    </div>
                </section>

                <div className="mt-8 p-4 bg-green-900/30 border border-green-500 rounded-lg text-center">
                    <p className="text-green-300">
                        By making a booking on our platform, you acknowledge that you have read, understood,
                        and agree to be bound by these Terms & Conditions.
                    </p>
                </div>
            </div>
        </PolicyLayout>
    );
};

export default TermsAndConditions;
