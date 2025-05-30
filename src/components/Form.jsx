import React, { useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import emailjs from "@emailjs/browser";

const Form = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(
            "service_1wrd1hq",
            "template_2iuh8zl",
            form.current,
            "42_EaOUr_eHcdnF8F"
        ).then(
            () => {
                alert("Message sent successfully!");
                form.current.reset(); // ✅ FIXED
            },
            (error) => {
                alert("Failed to send message. Please try again later.");
                console.error("EmailJS Error:", error);
            }
        );
    };

    const handleSubmit = () => {
        console.log("Submit button clicked!");
    };

    return (
        <div className="w-full max-w-md">
            <form ref={form} onSubmit={sendEmail} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <input
                        type="text"
                        name="user_name" // ✅ Important for emailjs to recognize the field
                        placeholder="Name"
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        name="user_email" // ✅ Required for emailjs template
                        placeholder="Email"
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <textarea
                        name="message" // ✅ Required for emailjs template
                        placeholder="Message"
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <Button
                    id="product-button"
                    title="Submit"
                    rightIcon={<TiLocationArrow />}
                    containerClass="w-full bg-gradient-to-r from-emerald-300 to-sky-400 overflow-x-clip text-black font-medium py-3 rounded-full hover:bg-gradient-to-l transition duration-300 flex items-center justify-center gap-2"
                    onClick={handleSubmit}
                />
            </form>
        </div>
    );
};

export default Form;
