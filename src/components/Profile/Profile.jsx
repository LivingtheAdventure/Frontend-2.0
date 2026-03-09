import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavBar from "../Nav/NavBar";
import { useFavourites } from "./Usefavourites";
import { ProfileCard } from "./Profilecard";
import { ProfileTabs } from "./Profiletabs";
import { FavouritesTab } from "./Favouritestab";
import { TripsTab, ReviewsTab } from "./Placeholdertabs";

function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("favourites");

    const { favouriteIds, favouriteEvents, loading: loadingFavs, error: favsError, reload: reloadFavs, toggle: toggleFavourite }
        = useFavourites(user, activeTab === "favourites");

    useEffect(() => {
        if (user === null) navigate("/", { replace: true });
    }, [user, navigate]);

    if (!user) return null;

    const handleLogout = async () => { await logout(); navigate("/", { replace: true }); };

    return (
        <div className="min-h-screen bg-[#070d19] text-white font-sans">

            <div className="sticky top-0 z-40"><NavBar /></div>

            {/* Hero */}
            <div className="relative h-72 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
                    alt="Adventure background" className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.35) saturate(1.2)" }} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070d19]/40 to-[#070d19]" />
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)",
                    backgroundSize: "40px 40px",
                }} />
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-semibold mb-1">Your Account</p>
                    <h1 className="text-4xl font-black tracking-tight"
                        style={{ fontFamily: "'Georgia', serif", textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}>
                        Explorer Profile
                    </h1>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-24 -mt-8 relative z-10">
                <ProfileCard user={user} onLogout={handleLogout} savedCount={favouriteIds.length} />
                <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} favouriteCount={favouriteIds.length} />
                {activeTab === "favourites" && (
                    <FavouritesTab favouriteIds={favouriteIds} favouriteEvents={favouriteEvents}
                        loading={loadingFavs} error={favsError} onReload={reloadFavs} onToggle={toggleFavourite} />
                )}
                {activeTab === "trips" && <TripsTab />}
                {activeTab === "reviews" && <ReviewsTab />}
            </div>
        </div>
    );
}

export default Profile;