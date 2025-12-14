import React, { useState, useEffect } from 'react';

const images = [
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2070&auto=format&fit=crop", // Hawa Mahal
    "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop", // Jal Mahal
    "https://images.unsplash.com/photo-1524230059367-514e27f06ed9?q=80&w=2071&auto=format&fit=crop", // Desert/Camels
    "https://images.unsplash.com/photo-1629209583493-29f9e54d89fa?q=80&w=2070&auto=format&fit=crop", // Udaipur
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop"  // Taj Lake Palace / Amber Fort vibe
];

const BackgroundCarousel = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 5000); // Speed up slightly to 5 seconds to show it's working
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-carousel">
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`bg-slide ${index === current ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${img})` }}
                />
            ))}
            <div className="bg-overlay" />

            <style jsx>{`
                .bg-carousel {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                    overflow: hidden;
                    background-color: #2D3748; /* Fallback Dark Blue-Grey */
                }
                .bg-slide {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    opacity: 0;
                    transition: opacity 1.5s ease-in-out, transform 8s ease-out; /* Faster crossfade */
                    transform: scale(1);
                }
                .bg-slide.active {
                    opacity: 1;
                    transform: scale(1.05); /* Subtle zoom effect */
                }
                .bg-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.4); /* Dark overlay for text readability */
                    backdrop-filter: blur(2px);
                }
            `}</style>
        </div>
    );
};

export default BackgroundCarousel;
