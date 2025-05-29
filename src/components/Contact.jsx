import React from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi"; // Icons for contact details
import Form from "./Form";

const Contact = () => {
  return (
    <div id="contact">
      <div className="relative">
        <div className=" text-white w-screen">
          <div className="flex flex-col bg-gradient-to-r from-emerald-300 to-sky-400 overflow-x-clip px-10 pt-8 pb-8 md:px-40 md:pt-32 md:pb-24 gap-1 ">
            <div className="w-96">
              <h1 className=" text-3xl">Get in Touch</h1>
              <span className="mt-10">
                Feel free to contact us? submit your queries here and we will
                get back to you as soon as possile.
              </span>
            </div>
          </div>
          <div className="bg-white p-6 lg:rounded-lg lg:shadow-md px-16 py-10 md:px-40 md:py-20">
            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FiPhone className="text-purple-600 text-2xl" />
                <a
                  href="tel:+918507980249"
                  className="text-gray-800 font-medium hover:text-purple-600"
                >
                  +91 8507980249
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <FiMail className="text-purple-600 text-2xl" />
                <a
                  href="mailto:gauravkreth@gmail.com"
                  className="text-gray-800 font-medium hover:text-purple-600"
                >
                  gauravkreth@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <FiMapPin className="text-purple-600 text-2xl" />
                <a
                  href="https://www.google.com/maps/place/Patna,+Bihar,+India,+800007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 font-medium hover:text-purple-600"
                >
                  Patna, Bihar, India, Pin - 800007
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-screen lg:absolute lg:bottom-24 lg:right-48 lg:w-[500px]">
        <div className="bg-white lg:rounded-lg lg:shadow-lg p-8 w-screen md:flex md:flex-col md:justify-center md:items-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Send Us Message
          </h2>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Contact;
