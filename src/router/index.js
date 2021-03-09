import { createWebHistory, createRouter } from "vue-router";
import Diary from "@/views/Diary.vue";
import Toolbox from "@/views/Toolbox.vue";
import Notes from "@/views/Notes.vue";
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
        component: Diary,
    },
    {
        path: "/toolbox",
        name: "Toolbox",
        component: Toolbox,
    },
    {
        path: "/notes",
        name: "Notes",
        component: Notes,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;