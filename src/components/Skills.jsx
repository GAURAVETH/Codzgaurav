import React from 'react'
import AnimatedTitle from './AnimatedTitle'
import Marquee from 'react-fast-marquee'


const Skills = () => {
    const numberOfImages = 37; // Change this to the number of images you want to display
    const images = [];

    for (let i = 0; i < numberOfImages; i++) {
        const index = 1 + i; // Start from 1 and increment by 37
        images.push(
            <div key={index}>
                <img className='w-20 mt-10 m-5' src={`/skills/icons-${index}.png`} alt={`Icon ${index}`} />
            </div>
        );
    }
    return (
        <section id="story" className='min-h-dvh w-screen text-blue-50'>
            <div className='flex size-full flex-col items-center py-10 pb-24'>
                <p className='font-general text-sm uppercase md:text-[10px]'>


                </p>
                <div className='relative size-full'>
                    <AnimatedTitle
                        title="Skills"
                        sectionId="#story"
                        containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
                    />
                    <div className='flex justify-center mx-60'>
                        <div className='relative overflow-hidden'style={{ maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0))' }}>
                            <Marquee autoFill pauseOnClick>
                                <div className='flex gap-10' >
                                    {images}
                                </div>
                            </Marquee>
                            <Marquee autoFill pauseOnClick direction='right'>
                                <div className='flex gap-10' >
                                    {images}
                                </div>
                            </Marquee>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Skills;
