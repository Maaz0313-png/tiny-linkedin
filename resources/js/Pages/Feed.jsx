import { useForm, Head, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import PostCard from "../Components/PostCard";

export default function Feed({ auth, posts, errors: propErrors, old }) {
    const { data, setData, post, processing, reset } = useForm({
        body: old?.body || "",
    });

    // Use errors from props instead of useForm
    const errors = propErrors || {};
    const { props } = usePage();
    const status = props.status;
    const [showToast, setShowToast] = useState(!!status);

    useEffect(() => {
        setShowToast(!!status);
    }, [status]);

    const handleCloseToast = () => setShowToast(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/posts", {
            onSuccess: () => reset("body"),
        });
    };

    return (
        <>
            <Head title="Feed" />
            {showToast && (
                <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-300 text-green-800 px-6 py-3 rounded shadow-lg flex items-center z-50 min-w-[250px] max-w-[90vw]">
                    <span className="flex-1">{status}</span>
                    <button
                        onClick={handleCloseToast}
                        className="ml-4 text-green-700 hover:text-green-900 font-bold text-lg focus:outline-none"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>
            )}
            <div className="w-full max-w-xl mx-auto">
                {/* LinkedIn-style Post Composer */}
                {auth?.user && (
                    <div className="bg-white rounded-lg shadow border border-gray-200 mb-4">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-2 p-4"
                        >
                            <div className="flex items-center mb-2">
                                <div className="w-11 h-11 rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold text-blue-700 mr-3">
                                    {auth.user.name[0]}
                                </div>
                                <span className="font-semibold text-gray-900">
                                    {auth.user.name}
                                </span>
                            </div>
                            <textarea
                                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0a66c2] resize-none min-h-[60px] bg-[#f3f6f8] text-base"
                                placeholder="Start a post"
                                value={data.body}
                                onChange={(e) =>
                                    setData("body", e.target.value)
                                }
                            />
                            {errors.body && (
                                <div className="text-red-500 text-sm">
                                    {errors.body}
                                </div>
                            )}
                            <button
                                type="submit"
                                className="self-end bg-[#0a66c2] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#004182] transition"
                                disabled={processing}
                            >
                                {processing ? "Posting..." : "Post"}
                            </button>
                        </form>
                    </div>
                )}
                {/* LinkedIn-style Feed Cards */}
                <div className="space-y-4">
                    {Array.isArray(posts) && posts.length === 0 && (
                        <div className="text-center text-gray-500">
                            No posts yet.
                        </div>
                    )}
                    {Array.isArray(posts) &&
                        posts.map((post) => (
                            <PostCard key={post.id} post={post} auth={auth} />
                        ))}
                </div>
            </div>
        </>
    );
}