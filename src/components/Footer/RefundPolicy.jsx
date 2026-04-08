// src/components/Footer/RefundPolicy.jsx
import React from "react";
import PolicyLayout from "./PolicyLayout";

const RefundPolicy = () => {
    return (
        <PolicyLayout title="Refund Policy">
            <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl mb-12 text-center">
                <p className="text-green-400 text-sm font-medium uppercase tracking-widest">
                    Processing Time: 5–7 Business Days
                </p>
            </div>

            <section className="space-y-6">
                <h3 className="text-lg font-medium text-white uppercase tracking-wider">Cancellation Tiers</h3>
                <div className="overflow-hidden rounded-xl border border-gray-800">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-900 text-gray-400 uppercase text-xs tracking-widest">
                            <tr>
                                <th className="px-6 py-4 font-medium">Timeline</th>
                                <th className="px-6 py-4 font-medium">Refund</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {[
                                { time: "30+ Days Before", refund: "100%", color: "text-green-400" },
                                { time: "15-30 Days Before", refund: "90%", color: "text-green-400" },
                                { time: "7-14 Days Before", refund: "50%", color: "text-yellow-400" },
                                { time: "Less than 72 Hours", refund: "0%", color: "text-red-400" },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-gray-900/50 transition-colors">
                                    <td className="px-6 py-4 text-gray-400">{row.time}</td>
                                    <td className={`px-6 py-4 font-bold ${row.color}`}>{row.refund}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="pt-12 border-t border-gray-800">
                <h3 className="text-lg font-medium text-white uppercase tracking-wider mb-4">No-Show Policy</h3>
                <p className="text-gray-400 leading-relaxed">
                    Failure to arrive at the designated meeting point without prior notice results in
                    <span className="text-white font-medium"> complete forfeiture</span> of the booking amount.
                </p>
            </section>
        </PolicyLayout>
    );
};

export default RefundPolicy;
