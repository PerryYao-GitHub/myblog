<script>
import {ref} from "vue";
import {useStore} from "vuex";
import router from "@/router";
import $ from 'jquery';
import ContainerField from "@/components/ContainerField.vue";

export default {
    name: 'RegisterView',
    components: {
        ContainerField: ContainerField,
    },

    setup: () => {
        const store = useStore();
        let username = ref("");
        let password = ref("");
        let confirmedPassword = ref("");
        let errorMessage = ref("");

        const register = () => {
            errorMessage.value = "";
            // console.log(store);
            // console.log(username.value, password.value, confirmedPassword.value);
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/user/",
                type: "post",
                data: {
                    username: username.value,
                    password: password.value,
                    password_confirm: confirmedPassword.value,
                },
                success: (resp) => {
                    if (resp.result === "success") {
                        store.dispatch("login", {
                            username: username.value,
                            password: password.value,
                            success: () => {
                                // console.log("success");
                                router.push({name: "list"})
                            },
                            error: () => {
                                // console.log("failed");
                                errorMessage.value = "something in system, try again after some time"
                            }
                        });
                    } else {
                        errorMessage.value = resp.result;
                    }
                }
            })
        }

        return {
            username,
            password,
            confirmedPassword,
            errorMessage,
            register,
        }
    }
}
</script>

<template>
    <ContainerField>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="register">
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input v-model="username" type="text" class="form-control" id="username">
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input v-model="password" type="password" class="form-control" id="password">
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Repeat your Password</label>
                        <input v-model="confirmedPassword" type="password" class="form-control" id="confirmed-password">
                    </div>
                    <div class="error-msg">{{ errorMessage }}</div>
                    <button type="submit" class="btn btn-primary">Register</button>
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