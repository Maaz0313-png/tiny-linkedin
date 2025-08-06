import { useForm, Head } from "@inertiajs/react";
import React from "react";

export default function Register({ errors: propErrors, old }) {
    const { data, setData, post, processing } = useForm({
        name: old?.name || "",
        email: old?.email || "",
        password: old?.password || "",
        password_confirmation: old?.password_confirmation || "",
        bio: old?.bio || "",
    });

    // Use errors from props instead of useForm
    const errors = propErrors || {};

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", data);
        post("/register");
    };

    return (
        <>
            <Head title="Register" />
            <div className="w-full max-w-md mx-auto mt-16">
                <div className="bg-white rounded-lg shadow border border-gray-200 p-8 flex flex-col items-center">
                    <svg
                        className="w-12 h-12 text-[#0a66c2] mb-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="4.983" cy="5.009" r="2.188" />
                        <path d="M9.237 8.855v10.32H5.927V8.855h3.31zm-1.655-1.66c-1.07 0-1.77.7-1.77 1.62 0 .91.68 1.62 1.73 1.62h.02c1.09 0 1.77-.71 1.77-1.62-.02-.92-.68-1.62-1.75-1.62zM20.452 13.37v5.805h-3.31v-5.42c0-1.36-.49-2.29-1.72-2.29-.94 0-1.5.63-1.75 1.24-.09.22-.11.53-.11.84v5.63h-3.31s.04-9.13 0-10.08h3.31v1.43c.44-.68 1.23-1.65 3-1.65 2.19 0 3.83 1.43 3.83 4.49z" />
                    </svg>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">
                        Join LinkedIn
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col gap-3"
                    >
                        <input
                            name="name"
                            placeholder="Name"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0a66c2] bg-[#f3f6f8] text-base"
                            value={data.name}
                            onChange={handleChange}
                        />
                        {errors.name && (
                            <div className="text-red-500 text-sm">
                                {errors.name}
                            </div>
                        )}
                        <input
                            name="email"
                            placeholder="Email"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0a66c2] bg-[#f3f6f8] text-base"
                            value={data.email}
                            onChange={handleChange}
                        />
                        {errors.email && (
                            <div className="text-red-500 text-sm">
                                {errors.email}
                            </div>
                        )}
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0a66c2] bg-[#f3f6f8] text-base"
                            value={data.password}
                            onChange={handleChange}
                        />
                        {errors.password && (
                            <div className="text-red-500 text-sm">
                                {errors.password}
                            </div>
                        )}
                        <input
                            name="password_confirmation"
                            type="password"
                            placeholder="Confirm Password"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0a66c2] bg-[#f3f6f8] text-base"
                            value={data.password_confirmation}
                            onChange={handleChange}
                        />
                        <textarea
                            name="bio"
                            placeholder="Bio"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0a66c2] bg-[#f3f6f8] text-base"
                            value={data.bio}
                            onChange={handleChange}
                        />
                        {errors.bio && (
                            <div className="text-red-500 text-sm">
                                {errors.bio}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="bg-[#0a66c2] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#004182] transition mt-2"
                            disabled={processing}
                        >
                            {processing ? "Joining..." : "Join now"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
