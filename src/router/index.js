import {createRouter, createWebHistory} from "vue-router";
import store from "@/store";
import HomeView from "@/views/HomeView.vue";
import ListView from "@/views/ListView.vue";
import ProfileView from "@/views/ProfileView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/list/",
        name: "list",
        component: ListView,
    },
    {
        path: "/profile/:userId/",
        name: "profile",
        component: ProfileView,
    },
    {
        path: "/login/",
        name: "login",
        component: LoginView,
    },
    {
        path: "/register/",
        name: "register",
        component: RegisterView,
    },
    {
        path: "/notfound/",
        name: "notfound",
        component: NotFoundView,
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/notfound/",
        component: NotFoundView,
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requestAuth && !store.state.user.is_login) next({name: "user_account_login"})
    else next();
});

export default router