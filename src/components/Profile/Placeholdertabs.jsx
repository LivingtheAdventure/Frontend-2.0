import { FaMountain } from "react-icons/fa";
import { MdStar } from "react-icons/md";

function PlaceholderTab({ icon, title, subtitle, color }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{ background: `${color}12`, border: `1px solid ${color}30` }}>
                <span className="text-3xl" style={{ color: `${color}99` }}>{icon}</span>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                <p className="text-sm text-slate-500 max-w-xs">{subtitle}</p>
            </div>
        </div>
    );
}

export function TripsTab() {
    return <PlaceholderTab icon={<FaMountain />} title="No trips booked yet"
        subtitle="Your upcoming and past bookings will appear here." color="#38bdf8" />;
}

export function ReviewsTab() {
    return <PlaceholderTab icon={<MdStar />} title="No reviews written yet"
        subtitle="After a trek, share your experience to help fellow explorers." color="#fbbf24" />;
}