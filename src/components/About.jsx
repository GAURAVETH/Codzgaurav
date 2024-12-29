import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all';
import AnimatedTitle from './AnimatedTitle';


gsap.registerPlugin(ScrollTrigger)
const About = () => {

    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: "#clip",
                start: "center center",
                end: "+=800 center",
                scrub: 0.5,
                pin: true,
                pinSpacing: true,
            }
        })
        clipAnimation.to(".mask-clip-path", {
            width: "100vw",
            height: "100vh",
            borderRadius: 0
        })
    })

    return (
        <div id='about' className='min-h-screen'>
            <div className='relative mb-8 mt-36 flex flex-col items-center gap-5'>
                <h2 className='font-general text-sm uppercase md:text-[10px]'>
                    Welcome to Codzgaurav
                </h2>
                <AnimatedTitle title="Full Stack Developer" containerClass="mt-5 !text-black text-center" />
                <div className='about-subtext'>
                    <p>To enhance my professional skills, capabilities and knowledge in an organization which recognizes the value of hard work and trusts me with responsibilities and challenges.</p>
                </div>
            </div>
            <div className='h-dvh w-screen' id="clip">
                <div className='mask-clip-path about-image'>
                    <img
                        src="img/cyber.png"
                        alt="Background"
                        className='absolute left-0 top-0 size-full object-cover'
                    />
                </div>
            </div>
        </div>
    )
}

export default About
