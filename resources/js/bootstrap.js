import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// Import Ziggy for route helpers
import { Ziggy } from "./ziggy.js";
import { route as ziggyRoute } from "ziggy-js";

// Make route function available globally
window.Ziggy = Ziggy;
window.route = ziggyRoute;
