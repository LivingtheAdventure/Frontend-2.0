import { useState, useEffect } from 'react';
import Event from '../Event/Event';


// helper: check if URL is YouTube
const isYouTube = (url = "") => /youtube\.com|youtu\.be/.test(url);

// helper: extract YouTube video ID
const extractYouTubeId = (url = "") => {
    const regExp = /(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
};

function ADVSlider({ heroType, movies = [] }) {
    const [activeMovie, setActiveMovie] = useState(null);
    const [videoKey, setVideoKey] = useState(Date.now());
    const [audioOn, setAudioOn] = useState(false);
    const [fade, setFade] = useState(false);
    const [showSectionName, setShowSectionName] = useState(false);

    // set initial movie safely
    useEffect(() => {
        if (movies.length && !activeMovie) {
            setActiveMovie(movies[0]);
        }
    }, [movies, activeMovie]);

    if (!movies.length || !activeMovie) return null;

    const currentIndex = movies.findIndex(m => m.id === activeMovie.id);

    const handleSlideChange = (movie) => {
        if (!movie || movie.id === activeMovie.id) return;

        setFade(true);
        setTimeout(() => {
            setActiveMovie(movie);
            setVideoKey(Date.now());
            setFade(false);
        }, 300);
    };

    const handleVideoEnd = () => {
        setFade(true);
        setTimeout(() => {
            const nextIndex = (currentIndex + 1) % movies.length;
            setActiveMovie(movies[nextIndex]);
            setVideoKey(Date.now());
            setFade(false);
        }, 300);
    };

    const toggleAudio = () => setAudioOn(a => !a);

    return (
        <>
            {/* Background Video */}
            <div
                className="fixed top-0 left-0 w-full h-min-screen z-0 "
                onMouseEnter={() => setShowSectionName(true)}
                onMouseLeave={() => setShowSectionName(false)}
            >
                <div className={`transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}>
                    {isYouTube(activeMovie.video) ? (
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                            <iframe
                                key={videoKey}
                                className="absolute top-0 left-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${extractYouTubeId(activeMovie.video)}?autoplay=1&mute=${audioOn ? 0 : 1}&controls=0&loop=1&playlist=${extractYouTubeId(activeMovie.video)}&modestbranding=1&showinfo=0`}
                                frameBorder="0"
                                allow="autoplay; fullscreen"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <video
                            key={videoKey}
                            poster={activeMovie.thumbnail}
                            loading="lazy"
                            className="w-full min-h-screen object-cover fixed top-0 left-0"
                            autoPlay
                            muted={!audioOn}
                            loop={false}
                            playsInline
                            onEnded={handleVideoEnd}
                        >
                            <source src={activeMovie.video} type="video/mp4" />
                        </video>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center">
                <div className="container mx-auto px-4 md:px-20 lg:px-24 w-full h-full flex flex-col justify-center ml-16">
                    <div className={`w-full transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}>
                        <h1 className="text-3xl md:text-4xl lg:text-2xl font-bold mb-4">
                            {activeMovie.title}
                        </h1>

                        <div className="flex items-center space-x-4 mb-2 text-gray-400 text-sm">
                            {(activeMovie.details || []).map(detail => (
                                <span key={detail}>{detail}</span>
                            ))}
                        </div>

                        <p className="text-base md:text-lg mb-6 leading-relaxed max-w-xl">
                            {activeMovie.description}
                        </p>

                        <div className="flex items-center space-x-2 mb-6 text-gray-300 text-sm">
                            {(activeMovie.genres || []).map((genre, index) => (
                                <span key={genre}>
                                    {genre}{index < activeMovie.genres.length - 1 && ' •'}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center mb-8 relative">
                            <div className='flex items-center space-x-4'>
                                <button className="bg-white text-black font-bold py-3 px-8 rounded-lg">
                                    Book Now
                                </button>
                                <button className="bg-white/20 text-white font-bold p-3 rounded-full">
                                    +
                                </button>
                            </div>

                            {/* Thumbnails */}
                            <div className="absolute right-0 top-1 flex items-end space-x-2">
                                {movies.map(movie => (
                                    <div
                                        key={movie.id}
                                        className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300
                                            ${activeMovie.id === movie.id ? 'w-24 h-16 border-2 border-white' : 'w-20 h-14 opacity-60'}
                                        `}
                                        onClick={() => handleSlideChange(movie)}
                                    >
                                        <img
                                            src={movie.thumbnail}
                                            alt={movie.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-20 bg-gradient-to-b from-transparent from-1% via-black/100 via-20% to-black to-70%">
                <Event heroType={heroType} />
            </div>
        </>
    );
}

export default ADVSlider;
