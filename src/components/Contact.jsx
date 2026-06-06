import React from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import Form from "./Form";
import HoverSoundLink from "./HoverSoundLink"; // Ensure this import is correct

const Contact = () => {
  return (
    <section id="contact" className="w-full bg-black py-20 text-blue-50">
      <div className="container mx-auto max-w-7xl px-5 md:px-10">

        {/* Modern 2-Column Grid Layout */}
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">

          {/* --- LEFT COLUMN: Contact Info --- */}
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
                Let's work together.
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-400">
                Have a project in mind, a question, or just want to say hi?
                Feel free to reach out. I'll get back to you as soon as possible.
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-8">
              {/* Phone */}
              <div className="group flex items-center gap-5">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-zinc-900 transition-colors duration-300 group-hover:border-emerald-400/50 group-hover:bg-zinc-800">
                  <FiPhone className="text-xl text-emerald-400 transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-400">Call Me</p>
                  <HoverSoundLink
                    text="+91 8507980249"
                    href="tel:+918507980249"
                    className="text-lg font-semibold transition-colors hover:text-emerald-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="group flex items-center gap-5">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-zinc-900 transition-colors duration-300 group-hover:border-emerald-400/50 group-hover:bg-zinc-800">
                  <FiMail className="text-xl text-emerald-400 transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-400">Email Me</p>
                  <HoverSoundLink
                    text="gauravkreth@gmail.com"
                    href="mailto:gauravkreth@gmail.com"
                    className="text-lg font-semibold transition-colors hover:text-emerald-400"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="group flex items-center gap-5">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-zinc-900 transition-colors duration-300 group-hover:border-emerald-400/50 group-hover:bg-zinc-800">
                  <FiMapPin className="text-xl text-emerald-400 transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-400">Location</p>
                  <HoverSoundLink
                    text="Patna, Bihar, India"
                    href="https://maps.app.goo.gl/your-map-link-here"
                    className="text-lg font-semibold transition-colors hover:text-emerald-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: The Form --- */}
          <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 p-8 shadow-2xl md:p-10">
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-emerald-400/20 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 size-64 rounded-full bg-sky-400/20 blur-[100px]" />

            <div className="relative z-10">
              <h3 className="mb-8 text-2xl font-semibold text-white">
                Send a Message
              </h3>
              <Form />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;