import { useState, useRef, useEffect } from "react";
import { useForm } from "@inertiajs/react";

function PostCard({ post, auth }) {
    const [isEditing, setIsEditing] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const dropdownRef = useRef(null);
    const editTextareaRef = useRef(null);

    const {
        data,
        setData,
        put,
        processing: updating,
    } = useForm({
        body: post.body,
    });

    const { delete: deletePost, processing: deleting } = useForm();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Focus textarea when entering edit mode
    useEffect(() => {
        if (isEditing && editTextareaRef.current) {
            editTextareaRef.current.focus();
            // Set cursor to end of text
            const length = editTextareaRef.current.value.length;
            editTextareaRef.current.setSelectionRange(length, length);
        }
    }, [isEditing]);

    const handleEdit = () => {
        setIsEditing(true);
        setShowDropdown(false);
    };

    const handleSave = (e) => {
        e.preventDefault();
        put(`/posts/${post.id}`, {
            onSuccess: () => {
                setIsEditing(false);
            },
        });
    };

    const handleCancel = () => {
        setData("body", post.body); // Reset to original content
        setIsEditing(false);
    };

    const handleDelete = () => {
        setShowDeleteConfirm(true);
        setShowDropdown(false);
    };

    const confirmDelete = () => {
        deletePost(`/posts/${post.id}`);
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
    };

    // Handle keyboard navigation for dropdown
    const handleDropdownKeyDown = (e) => {
        if (e.key === "Escape") {
            setShowDropdown(false);
        }
    };

    // Check if current user is the post author
    const isAuthor = auth?.user?.id === post.user.id;

    // Check if post has been edited
    const isEdited = post.updated_at !== post.created_at;

    return (
        <div className="bg-white rounded-lg shadow border border-gray-200 flex flex-col p-4">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <div className="w-11 h-11 rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold text-blue-700 mr-3">
                        {post.user.name[0]}
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900">
                            {post.user.name}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 flex-wrap">
                            <span className="hidden sm:inline">
                                {new Date(post.created_at).toLocaleString()}
                            </span>
                            <span className="sm:hidden">
                                {new Date(post.created_at).toLocaleDateString()}{" "}
                                {new Date(post.created_at).toLocaleTimeString(
                                    [],
                                    { hour: "2-digit", minute: "2-digit" }
                                )}
                            </span>
                            {isEdited && (
                                <>
                                    <span>•</span>
                                    <span className="text-gray-400 hidden sm:inline">
                                        Edited{" "}
                                        {new Date(
                                            post.updated_at
                                        ).toLocaleString()}
                                    </span>
                                    <span className="text-gray-400 sm:hidden">
                                        Edited
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Three dots menu - only show for post author */}
                {isAuthor && (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            onKeyDown={handleDropdownKeyDown}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:ring-offset-1"
                            aria-label="Post options"
                            aria-expanded={showDropdown}
                            aria-haspopup="true"
                        >
                            <svg
                                className="w-5 h-5 text-gray-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                        </button>

                        {/* Dropdown menu */}
                        {showDropdown && (
                            <div className="absolute right-0 top-full mt-1 w-40 sm:w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                                <button
                                    onClick={handleEdit}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:bg-gray-100"
                                >
                                    <svg
                                        className="w-4 h-4 inline mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                    Edit Post
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors focus:outline-none focus:bg-red-50"
                                >
                                    <svg
                                        className="w-4 h-4 inline mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                    Delete Post
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Post content - editable or display mode */}
            {isEditing ? (
                <form onSubmit={handleSave} className="mt-2">
                    <textarea
                        ref={editTextareaRef}
                        value={data.body}
                        onChange={(e) => setData("body", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0a66c2] resize-none min-h-[80px] bg-[#f3f6f8] text-base"
                        disabled={updating}
                    />
                    <div className="flex justify-end gap-2 mt-3">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:ring-offset-1 transition-colors"
                            disabled={updating}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-[#0a66c2] rounded-lg hover:bg-[#004182] focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:ring-offset-1 transition-colors disabled:opacity-50"
                            disabled={updating || !data.body.trim()}
                        >
                            {updating ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="text-gray-900 whitespace-pre-line text-base mt-2">
                    {post.body}
                </div>
            )}

            {/* Delete confirmation modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Delete Post
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Are you sure you want to delete this post? This
                            action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:ring-offset-1 transition-colors"
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-colors disabled:opacity-50"
                                disabled={deleting}
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostCard;
