import { FaHeart, FaMountain } from "react-icons/fa";
import { MdStar } from "react-icons/md";

const TABS = [
    { id: "favourites", label: "Favourites", icon: <FaHeart /> },
    { id: "trips", label: "My Trips", icon: <FaMountain /> },
    { id: "reviews", label: "Reviews", icon: <MdStar /> },
];

export function ProfileTabs({ activeTab, onTabChange, favouriteCount }) {
    return (
        <div
            className="flex gap-1 mb-6 p-1 rounded-xl w-fit"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
            {TABS.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                        style={
                            isActive
                                ? { background: "rgba(255,255,255,0.1)", color: "#f1f5f9", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }
                                : { color: "#64748b" }
                        }
                    >
                        <span className={isActive ? "text-emerald-400" : ""}>{tab.icon}</span>
                        {tab.label}
                        {tab.id === "favourites" && favouriteCount > 0 && (
                            <span
                                className="ml-1 text-xs px-1.5 py-0.5 rounded-full font-semibold"
                                style={{ background: "rgba(52,211,153,0.18)", color: "#34d399" }}
                            >
                                {favouriteCount}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}