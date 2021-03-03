import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Diary.vue";
import Login from "@/views/Login.vue";

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login,
    },
    {
        path: "/diary",
        name: "Diary",
        component: Home,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;