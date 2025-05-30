import { useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import emailjs from "emailjs/browser";

const Form = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          alert("Message sent successfully!");
          form.current.reset(); // Fixed typo
        },
        (error) => {
          alert("Failed to send message. Please try again later.");
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
            name="user_name"
            placeholder="Name"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="user_email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <textarea
            name="message"
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
