import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import MainLayout from "./Layouts/MainLayout";

const appName = import.meta.env.VITE_APP_NAME || "TinyLinkedIn";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx");
        const pageModule = await pages[`./Pages/${name}.jsx`]();

        // Wrap the page component with MainLayout
        const OriginalComponent = pageModule.default;

        return {
            default: (props) => (
                <MainLayout auth={props.auth}>
                    <OriginalComponent {...props} />
                </MainLayout>
            ),
        };
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
