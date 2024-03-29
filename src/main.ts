import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "bulma/css/bulma.css";
import "bulma-helpers/css/bulma-helpers.min.css";
// Polyfill
import "regenerator-runtime/runtime";

import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");
