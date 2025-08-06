import { useForm, Head } from "@inertiajs/react";
import React from "react";

export default function Profile({ user, auth, errors: propErrors, old }) {
    const isMe = auth?.user && auth.user.id === user.id;
    const { data, setData, post, processing, reset } = useForm({
        bio: old?.bio || user.bio || "",
    });

    // Use errors from props instead of useForm
    const errors = propErrors || {};

    const handleChange = (e) => {
        setData("bio", e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/profile", {
            onSuccess: () => reset("bio"),
        });
    };

    return (
        <>
            <Head title="Profile" />
            <div className="w-full max-w-xl mx-auto">
                {/* LinkedIn-style Profile Card */}
                <div className="bg-white rounded-lg shadow border border-gray-200 mb-6 p-6 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-blue-200 flex items-center justify-center text-4xl font-bold text-blue-700 mb-2">
                        {user.name[0]}
                    </div>
                    <div className="font-bold text-2xl text-gray-900 mb-1">
                        {user.name}
                    </div>
                    <div className="text-gray-500 text-base mb-2">
                        {user.email}
                    </div>
                    <div className="text-gray-700 text-center mb-2 whitespace-pre-line min-h-[32px]">
                        {user.bio}
                    </div>
                    {isMe && (
                        <form
                            onSubmit={handleSubmit}
                            className="w-full mt-2 flex flex-col items-center gap-2"
                        >
                            <textarea
                                name="bio"
                                value={data.bio}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#0a66c2] bg-[#f3f6f8]"
                                placeholder="Update your bio"
                            />
                            {errors.bio && (
                                <div className="text-red-500 text-sm">
                                    {errors.bio}
                                </div>
                            )}
                            <button
                                type="submit"
                                className="bg-[#0a66c2] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#004182] transition"
                                disabled={processing}
                            >
                                {processing ? "Updating..." : "Update Bio"}
                            </button>
                        </form>
                    )}
                </div>
                {/* LinkedIn-style Posts List */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Posts</h3>
                    <div className="space-y-4">
                        {user.posts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white rounded-lg shadow border border-gray-200 p-4"
                            >
                                <div className="text-gray-900 whitespace-pre-line text-base mb-1">
                                    {post.body}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {new Date(post.created_at).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
