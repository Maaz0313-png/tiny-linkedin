import React, { useState } from "react";
import { router } from "@inertiajs/react";

export default function MainLayout({ auth, children }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [meDropdownOpen, setMeDropdownOpen] = useState(false);
    const meDropdownRef = React.useRef(null);

    React.useEffect(() => {
        if (!meDropdownOpen) return;
        function handleClick(e) {
            if (
                meDropdownRef.current &&
                !meDropdownRef.current.contains(e.target)
            ) {
                setMeDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [meDropdownOpen]);
    return (
        <div className="min-h-screen bg-[#f3f2ef] flex flex-col">
            {/* LinkedIn Blue Navbar */}
            <nav className="bg-[#0a66c2] shadow-sm sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center h-14">
                    {/* Mobile Layout (< sm): Logo + Search + Messaging */}
                    <div className="flex sm:hidden items-center w-full">
                        {/* LinkedIn Logo */}
                        <a
                            href="/"
                            className="flex items-center mr-3 flex-shrink-0"
                        >
                            <svg
                                className="w-8 h-8 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="4.983" cy="5.009" r="2.188" />
                                <path d="M9.237 8.855v10.32H5.927V8.855h3.31zm-1.655-1.66c-1.07 0-1.77.7-1.77 1.62 0 .91.68 1.62 1.73 1.62h.02c1.09 0 1.77-.71 1.77-1.62-.02-.92-.68-1.62-1.75-1.62zM20.452 13.37v5.805h-3.31v-5.42c0-1.36-.49-2.29-1.72-2.29-.94 0-1.5.63-1.75 1.24-.09.22-.11.53-.11.84v5.63h-3.31s.04-9.13 0-10.08h3.31v1.43c.44-.68 1.23-1.65 3-1.65 2.19 0 3.83 1.43 3.83 4.49z" />
                            </svg>
                        </a>

                        {/* Full-width Search Input */}
                        <div className="flex-1 mx-3">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full px-3 py-1 rounded bg-[#eef3f8] text-gray-900 placeholder-gray-500 focus:outline-none text-sm"
                            />
                        </div>

                        {/* Messaging Icon */}
                        <a
                            href="#"
                            className="flex flex-col items-center text-white hover:text-[#dbeafe] transition-colors p-2 flex-shrink-0"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M16 2H8C6.9 2 6 2.9 6 4v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 4h8v12H8V4zm0 14h8v2H8v-2z" />
                            </svg>
                        </a>
                    </div>
                    {/* Tablet/Desktop Layout (≥ sm): Current design */}
                    <div className="hidden sm:flex items-center w-full">
                        {/* Left: Logo and Search (if open) */}
                        <div className="flex items-center flex-shrink-0">
                            <a
                                href="/"
                                className="flex items-center space-x-2 mr-2"
                            >
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="4.983" cy="5.009" r="2.188" />
                                    <path d="M9.237 8.855v10.32H5.927V8.855h3.31zm-1.655-1.66c-1.07 0-1.77.7-1.77 1.62 0 .91.68 1.62 1.73 1.62h.02c1.09 0 1.77-.71 1.77-1.62-.02-.92-.68-1.62-1.75-1.62zM20.452 13.37v5.805h-3.31v-5.42c0-1.36-.49-2.29-1.72-2.29-.94 0-1.5.63-1.75 1.24-.09.22-.11.53-.11.84v5.63h-3.31s.04-9.13 0-10.08h3.31v1.43c.44-.68 1.23-1.65 3-1.65 2.19 0 3.83 1.43 3.83 4.49z" />
                                </svg>
                                <span className="hidden lg:block text-2xl font-bold text-white tracking-tight">
                                    LinkedIn
                                </span>
                            </a>
                            {/* Search toggle button for tablet */}
                            {!isSearchOpen && (
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="flex-col items-center justify-center hidden sm:flex lg:hidden text-white hover:bg-[#004182] rounded-full transition-colors h-14"
                                    style={{ minWidth: "56px" }}
                                >
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <svg
                                            className="w-6 h-6 mb-1"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <span className="text-xs">Search</span>
                                    </div>
                                </button>
                            )}
                            {isSearchOpen && (
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="ml-2 w-48 md:w-80 px-3 py-1 rounded bg-[#eef3f8] text-gray-900 placeholder-gray-500 focus:outline-none text-sm"
                                    autoFocus
                                    onBlur={() => setIsSearchOpen(false)}
                                />
                            )}
                        </div>

                        {/* Desktop Search Bar - Always visible */}
                        <div className="hidden lg:flex ml-4">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-80 px-3 py-1 rounded bg-[#eef3f8] text-gray-900 placeholder-gray-500 focus:outline-none text-sm"
                            />
                        </div>

                        {/* Center: Navigation Items */}
                        <div className="flex-1 flex justify-center">
                            <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
                                <a
                                    href="/"
                                    className="flex flex-col items-center text-white hover:text-[#dbeafe] transition-colors"
                                >
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6 mb-1"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M23.5 9.5H20v13h3.5c.3 0 .5-.2.5-.5V10c0-.3-.2-.5-.5-.5zM8 23V9.5H4.5c-.3 0-.5.2-.5.5v12.5c0 .3.2.5.5.5H8zM18 23h-8V9.5h8V23zM12 2L2 9.5h20L12 2z" />
                                    </svg>
                                    <span className="text-xs hidden sm:block">
                                        Home
                                    </span>
                                </a>
                                <a
                                    href="#"
                                    className="flex flex-col items-center text-white hover:text-[#dbeafe] transition-colors"
                                >
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6 mb-1"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 16v6H3v-6c0-1.66 1.34-3 3-3h3c1.66 0 3 1.34 3 3zM21 16v6h-9v-6c0-1.66 1.34-3 3-3h3c1.66 0 3 1.34 3 3zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zM16.5 12c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5 14.57 12 16.5 12z" />
                                    </svg>
                                    <span className="text-xs hidden sm:block">
                                        Network
                                    </span>
                                </a>
                                <a
                                    href="#"
                                    className="flex flex-col items-center text-white hover:text-[#dbeafe] transition-colors"
                                >
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6 mb-1"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M17 6V5c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v1H4c-.55 0-1 .45-1 1s.45 1 1 1h1v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8h1c.55 0 1-.45 1-1s-.45-1-1-1h-3zM9 5h6v1H9V5zm7 14H8V8h8v11z" />
                                    </svg>
                                    <span className="text-xs hidden sm:block">
                                        Jobs
                                    </span>
                                </a>
                                <a
                                    href="#"
                                    className="flex flex-col items-center text-white hover:text-[#dbeafe] transition-colors"
                                >
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6 mb-1"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M16 2H8C6.9 2 6 2.9 6 4v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 4h8v12H8V4zm0 14h8v2H8v-2z" />
                                    </svg>
                                    <span className="text-xs hidden sm:block">
                                        Messaging
                                    </span>
                                </a>
                                <a
                                    href="#"
                                    className="flex flex-col items-center text-white hover:text-[#dbeafe] transition-colors"
                                >
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6 mb-1"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                    <span className="text-xs hidden sm:block">
                                        Notifications
                                    </span>
                                </a>
                                {auth?.user ? (
                                    <div
                                        className="relative"
                                        ref={meDropdownRef}
                                    >
                                        <button
                                            className="flex flex-col items-center text-white hover:text-[#dbeafe] transition-colors focus:outline-none"
                                            onClick={() =>
                                                setMeDropdownOpen((v) => !v)
                                            }
                                            aria-haspopup="true"
                                            aria-expanded={meDropdownOpen}
                                        >
                                            <svg
                                                className="w-5 h-5 sm:w-6 sm:h-6 mb-1"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                            <span className="text-xs hidden sm:block">
                                                Me
                                            </span>
                                        </button>
                                        {meDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 z-50">
                                                <a
                                                    href="/profile"
                                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                >
                                                    Profile
                                                </a>
                                                <button
                                                    onClick={() =>
                                                        router.post("/logout")
                                                    }
                                                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        <a
                                            href="/login"
                                            className="flex flex-col items-center text-white hover:text-[#dbeafe] transition-colors"
                                        >
                                            <svg
                                                className="w-5 h-5 sm:w-6 sm:h-6 mb-1"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v12z" />
                                            </svg>
                                            <span className="text-xs hidden sm:block">
                                                Login
                                            </span>
                                        </a>
                                        <a
                                            href="/register"
                                            className="flex flex-col items-center text-white hover:text-[#dbeafe] transition-colors"
                                        >
                                            <svg
                                                className="w-5 h-5 sm:w-6 sm:h-6 mb-1"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                            <span className="text-xs hidden sm:block">
                                                Register
                                            </span>
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main 3-column Layout */}
            <main className="flex-1 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-4 lg:gap-6 py-4 lg:py-8 px-2 sm:px-4">
                {/* Left Sidebar */}
                <aside className="w-full lg:w-1/4 lg:max-w-xs order-2 lg:order-1">
                    <div className="bg-white rounded-lg shadow p-4 mb-4">
                        {/* Profile summary placeholder */}
                        {auth?.user ? (
                            <>
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold text-blue-700 mb-2">
                                        {auth.user.name[0]}
                                    </div>
                                    <div className="font-semibold text-lg">
                                        {auth.user.name}
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                        {auth.user.email}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center text-gray-500">
                                Sign in to see your profile
                            </div>
                        )}
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 lg:block hidden">
                        <div className="font-semibold text-gray-700 mb-2">
                            Navigation
                        </div>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="/"
                                    className="text-blue-700 hover:underline"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/profile"
                                    className="text-blue-700 hover:underline"
                                >
                                    Profile
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>
                {/* Center Feed/Content */}
                <section className="flex-1 min-w-0 order-1 lg:order-2">
                    {children}
                </section>
                {/* Right Sidebar */}
                <aside className="w-full lg:w-1/4 lg:max-w-xs order-3 hidden lg:block">
                    <div className="bg-white rounded-lg shadow p-4 mb-4">
                        <div className="font-semibold text-gray-700 mb-2">
                            People you may know
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                    A
                                </div>{" "}
                                <span className="text-gray-700">Alice</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                    B
                                </div>{" "}
                                <span className="text-gray-700">Bob</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="font-semibold text-gray-700 mb-2">
                            Ad
                        </div>
                        <div className="text-gray-500 text-sm">
                            Your ad here
                        </div>
                    </div>
                </aside>
            </main>

            {/* Mobile Bottom Navigation - LinkedIn Style */}
            <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
                <div className="flex items-center justify-around py-2">
                    <a
                        href="/"
                        className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-[#0a66c2] transition-colors"
                    >
                        <svg
                            className="w-6 h-6 mb-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M23.5 9.5H20v13h3.5c.3 0 .5-.2.5-.5V10c0-.3-.2-.5-.5-.5zM8 23V9.5H4.5c-.3 0-.5.2-.5.5v12.5c0 .3.2.5.5.5H8zM18 23h-8V9.5h8V23zM12 2L2 9.5h20L12 2z" />
                        </svg>
                        <span className="text-xs">Home</span>
                    </a>
                    <a
                        href="#"
                        className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-[#0a66c2] transition-colors"
                    >
                        <svg
                            className="w-6 h-6 mb-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 16v6H3v-6c0-1.66 1.34-3 3-3h3c1.66 0 3 1.34 3 3zM21 16v6h-9v-6c0-1.66 1.34-3 3-3h3c1.66 0 3 1.34 3 3zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zM16.5 12c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5 14.57 12 16.5 12z" />
                        </svg>
                        <span className="text-xs">Network</span>
                    </a>
                    <a
                        href="#"
                        className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-[#0a66c2] transition-colors"
                    >
                        <svg
                            className="w-6 h-6 mb-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M17 6V5c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v1H4c-.55 0-1 .45-1 1s.45 1 1 1h1v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8h1c.55 0 1-.45 1-1s-.45-1-1-1h-3zM9 5h6v1H9V5zm7 14H8V8h8v11z" />
                        </svg>
                        <span className="text-xs">Jobs</span>
                    </a>
                    <a
                        href="#"
                        className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-[#0a66c2] transition-colors"
                    >
                        <svg
                            className="w-6 h-6 mb-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M16 2H8C6.9 2 6 2.9 6 4v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 4h8v12H8V4zm0 14h8v2H8v-2z" />
                        </svg>
                        <span className="text-xs">Messaging</span>
                    </a>
                    <a
                        href="#"
                        className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-[#0a66c2] transition-colors"
                    >
                        <svg
                            className="w-6 h-6 mb-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <span className="text-xs">Notifications</span>
                    </a>
                    {auth?.user ? (
                        <div className="relative" ref={meDropdownRef}>
                            <button
                                className="flex flex-col items-center text-white hover:text-[#dbeafe] transition-colors focus:outline-none"
                                onClick={() => setMeDropdownOpen((v) => !v)}
                                aria-haspopup="true"
                                aria-expanded={meDropdownOpen}
                            >
                                <svg
                                    className="w-5 h-5 sm:w-6 sm:h-6 mb-1"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                                <span className="text-xs hidden sm:block">
                                    Me
                                </span>
                            </button>
                            {meDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 z-50">
                                    <a
                                        href="/profile"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Profile
                                    </a>
                                    <button
                                        onClick={() => router.post("/logout")}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <a
                            href="/login"
                            className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-[#0a66c2] transition-colors"
                        >
                            <svg
                                className="w-6 h-6 mb-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v12z" />
                            </svg>
                            <span className="text-xs">Login</span>
                        </a>
                    )}
                </div>
            </nav>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 text-center py-4 px-4 text-xs sm:text-sm text-gray-500 mt-4 lg:mt-8 mb-16 sm:mb-0">
                <div className="max-w-7xl mx-auto">
                    &copy; {new Date().getFullYear()} TinyLinkedIn. Not
                    affiliated with LinkedIn.
                </div>
            </footer>
        </div>
    );
}
