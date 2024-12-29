import React, { Fragment } from 'react';
import AnimatedTitle from './AnimatedTitle';
import { PiStarFourFill } from 'react-icons/pi';

const words = [
    "Performant", "Accessible", "Secure", "Interactive", "Scalable",
    "User Friendly", "Maintainable", "Search Optimized", "Usable", "Reliable"
];

const skillswords = [
    "HTML5", "CSS3", "TailwindCSS", "Bootstrap", "AWS", "DevOps",
    "Docker", "Python", "Linux", "JAVASCRIPT", "React", "MongoDB",
    "ExpressJS", "NodeJS", "Tableau", "Microsoft Power BI"
];


const Skills = () => {
    return (
        <section id="skills" className=" text-blue-50">
            <div className="flex size-full flex-col items-center py-10 pb-24">
                <div className="relative size-full">
                    <AnimatedTitle
                        title="Skills"
                        containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
                    />
                    <div className='py-16'>
                        <div className='bg-gradient-to-r from-emerald-300 to-sky-400 overflow-x-clip rotate-3 -mx-1'>
                            <div className='flex [mask-image:linear-gradient(to_right, transparent, black_10%, black_90%, trasnparent)]'
                                style={{
                                    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                                    WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", // For WebKit browsers
                                }}>
                                <div className='flex flex-none gap-4 py-3 animate-move-left [animation-duration:30s] '>
                                    {new Array(4).fill(0).map((_, idx) => (
                                        <Fragment key={idx}>
                                            {words.map(word => (
                                                <div key={word} className='inline-flex gap-4 items-center'>
                                                    <PiStarFourFill className='size-3 text-gray-900' />
                                                    <span className='text-gray-900 uppercase font-extrabold text-sm '>{word}</span>
                                                </div>
                                            ))}
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='m-[-100px]'>
                        <div className='bg-gradient-to-r from-emerald-300 to-sky-400 overflow-x-clip -rotate-3 -mx-1'>
                            <div className='flex [mask-image:linear-gradient(to_right, transparent, black_10%, black_90%, trasnparent)]'
                                style={{
                                    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                                    WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", // For WebKit browsers
                                }}>
                                <div className='flex flex-none gap-4 py-3 animate-move-right [animation-duration:30s] '>
                                    {new Array(4).fill(0).map((_, idx) => (
                                        <Fragment key={idx}>
                                            {skillswords.map(word => (
                                                <div key={word} className='inline-flex gap-4 items-center'>
                                                    <PiStarFourFill className='size-3 text-gray-900' />
                                                    <span className='text-gray-900 uppercase font-extrabold text-sm '>{word}</span>
                                                </div>
                                            ))}
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
