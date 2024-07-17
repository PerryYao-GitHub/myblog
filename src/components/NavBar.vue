<script>
import {useStore} from "vuex";
import router from "@/router";

export default {
    name: "NavBar",
    // computed: {
    //     $store() {
    //         return store
    //     }
    // },

    setup: ()=> {
        const store = useStore();
        // console.log(store.state.user.username);

        const logout = () => {
            store.commit('logout');  // 调用mutations的函数用 commit // 调用actions的函数用 dispatch
            router.push({name: "login"});
        }
        return {
            store,
            logout
        }
    }
}
</script>

<template>
    <nav class="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div class="container">
            <a class="navbar-brand" href="/">My Blog</a>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'home'}">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'list'}">List</router-link>
                    </li>
<!--                    <li class="nav-item">-->
<!--                        <router-link class="nav-link" :to="{name: 'profile', params: {userId: 2}}">Profile</router-link>-->
<!--                    </li>-->
                </ul>




                <ul class="navbar-nav" v-if="!store.state.user.isLogin">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'login'}">Login</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'register'}">Register</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav" v-else>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'profile', params: {userId: store.state.user.id}}" >
                            {{ store.state.user.username }}
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" style="cursor: pointer" @click="logout">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>

</style>