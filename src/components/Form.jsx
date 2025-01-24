import React from 'react'
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";

const Form = () => {
    const handleSubmit = () => {
        console.log("Submit button clicked!");
    };

    return (
        <div className="w-full max-w-md">
            <form>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <textarea
                        placeholder="Phone"
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
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
    )
}

export default Form
