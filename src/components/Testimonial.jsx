import { Fragment } from "react";
import Card from "./Card";
import Header from "./Header";

const testimonials = [
  {
    name: "Aniket Kumar",
    position: "Frontend Developer",
    text: "Working with Aniket has been an absolute pleasure. His attention to detail and dedication to creating seamless user experiences is remarkable. He excels at crafting intuitive UI designs and implementing efficient code structures.",
    avatar: "/img/profile.png",
  },
  {
    name: "Vema Naveen",
    position: "Full-Stack Developer",
    text: "Vema's expertise in backend development is unparalleled. His ability to integrate robust solutions while ensuring scalability and performance sets him apart. He is a team player who consistently delivers high-quality work.",
    avatar: "/img/profile.png",
  },
  {
    name: "Gaurav Kumar",
    position: "MERN Stack Developer",
    text: "Gaurav has been instrumental in delivering complex projects, from user-friendly UIs to efficient backends. His proficiency in modern technologies like React, Node.js, and MongoDB ensures that projects are not just functional but also future-proof.",
    avatar: "/img/profile.png",
  },
  {
    name: "Project Manager",
    position: "Feedback Collection System",
    text: "The Feedback Collection System project showcased the team's collaborative spirit and technical expertise. Their use of the MERN stack, combined with TailwindCSS and Bootstrap, created a dynamic and responsive platform.",
    avatar: "/img/profile.png",
  },
  {
    name: "Client",
    position: "Chat Application",
    text: "The real-time chat application developed by the team exceeded our expectations. Its seamless performance, secure authentication, and visually appealing design have greatly improved our user engagement.",
    avatar: "/img/profile.png",
  },
];

const Testimonial = () => {
  return (
    <div className="mt-20 p-16 md:px-24 lg:px-40 ">
      <Header eyebrow="Happy Client" title="What Clients Say about Me" description=" Don't just take my word for it. See what my clients have to say about my work." />
      <div
        className="mt-12 lg:mt-20 flex overflow-x-clip"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="mt-16 mb-16 flex">
          <div className="flex gap-8 pr-8 flex-none animate-move-left [animation-duration: 90s] hover:[animation-play-state:paused]">
            {[...new Array(4)].fill(0).map((_, index) => (
              <Fragment key={index}>
                {testimonials.map((testimonial) => (
                  <Card
                    key={testimonial.name}
                    className="max-w-sm md:max-w-md md:p-8 hover:-rotate-3 transition duration-500 transform"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="size-14 bg-gray-700 inline-flex rounded-full items-center justify-center flex-shrink-0">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="max-h-full"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-emerald-400">{testimonial.name}</div>
                        <div className="text-sm text-white/40">{testimonial.position}</div>
                      </div>
                    </div>
                    <p className="mt-4 md:mt-6 text-sm text-white md:text-base">
                      {testimonial.text}
                    </p>
                  </Card>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
