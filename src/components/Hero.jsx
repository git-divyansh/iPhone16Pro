import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { heroVideo, smallHeroVideo, appleImg, bagImg, searchImg } from "../utils";
import { navLists } from '../constants';
import appleIntelligenceImage from "./1.png";
import FloatingNavbar from "./FloatingNavbar"; // Import the floating navbar

const HeroWithNavbar = () => {
    const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo);

    const handleVideoSrcSet = () => {
        if (window.innerWidth < 760) {
            setVideoSrc(smallHeroVideo);
        } else {
            setVideoSrc(heroVideo);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleVideoSrcSet);
        return () => {
            window.removeEventListener('resize', handleVideoSrcSet);
        };
    }, []);

    useEffect(() => {
        gsap.to('#hero', { opacity: 1, delay: 4.7 });
        gsap.fromTo('#image',
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, delay: 4.8 }
        );
        gsap.fromTo('#cta',
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, delay: 4.8 }
        );
    }, []);

    return (
        <>
            <section className="w-full h-screen bg-black relative">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        className="w-full h-95 object-cover"
                        autoPlay
                        muted
                        playsInline={true}
                        key={videoSrc}
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                </div>

                {/* Static Navbar inside Hero */}
                <header className="w-full flex flex-col justify-between items-center relative z-20">
                    <nav className="flex w-full screen-max-width items-center py-3 sm:px-10 px-5 bg-transparent">
                        <img src={appleImg} alt="Apple" width={12} height={12} />
                        <div className="flex justify-center max-sm:hidden">
                            {navLists.map((nav) => (
                                <div key={nav} className="px-6 text-sm cursor-pointer text-gray-200 hover:text-white transition-all">
                                    {nav}
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-9">
                            <img src={searchImg} alt='search' width={14} height={14} className="cursor-pointer" />
                            <img src={bagImg} alt='bag' width={14} height={14} className="cursor-pointer" />
                        </div>
                    </nav>
                </header>

                {/* Hero Content */}
                <div className="relative h-full w-full flex-center flex-col z-10">
                    <div className="flex flex-col items-center">
                        <p id="hero" className=" hero-title text-5xl font-semibold mb-4"style={{color:'white'}}>iPhone 16 Pro</p>
                        <img
                            id="image"
                            src={appleIntelligenceImage}
                            alt="Built for Apple Intelligence"
                            className="w-full max-w-4xl -mt-48 opacity-100"
                        />
                    </div>
                    <div id="cta" className="flex flex-col items-center opacity-0 translate-y-80">
                        <a href="#highlights" className="btn bg-white text-black rounded-full text-lg font-medium mb-4 hover:bg-opacity-90 transition-all">Buy</a>
                        <p className="text-gray text-xl">From ₹119900.00*</p>
                        <p className="text-gray text-xl">Apple Intelligence starting in US English later this year</p>
                    </div>
                </div>

            </section>

            {/* Floating Navbar */}
            <FloatingNavbar /> {/* Include the new floating navbar */}
        </>
    );
};

export default HeroWithNavbar;
