<script>
import {ref} from "vue";
import {useStore} from "vuex";
import ContainerField from "@/components/ContainerField.vue";
import router from "@/router";

export default {
    name: 'LoginView',
    components: {
        ContainerField: ContainerField,
    },

    setup: () => {
        const store = useStore();
        let username = ref("");
        let password = ref("");
        let errorMessage = ref("");

        const login = () => {
            errorMessage.value = "";
            store.dispatch("login", {
                username: username.value,
                password: password.value,
                success: ()=>{
                    // console.log("success");
                    router.push({name: "list"});
                },
                error: ()=>{
                    // console.log("failed");
                    errorMessage.value = "wrong username or password"
                }
            });
        }

        return {
            username,
            password,
            errorMessage,
            login,
        }
    }
}
</script>

<template>
    <ContainerField>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input v-model="username" type="text" class="form-control" id="username">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input v-model="password" type="password" class="form-control" id="password">
                    </div>
                    <div class="error-msg">{{errorMessage}}</div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>
        </div>

    </ContainerField>
</template>

<style scoped>
button {
    width: 100%;
}
.error-msg {
    color: red;
}
</style>