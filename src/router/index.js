import { createWebHistory, createRouter } from "vue-router";
import Diary from "@/views/Diary.vue";
import Tools from "@/views/Tools.vue";
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
        path: "/tools",
        name: "Tools",
        component: Tools,
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