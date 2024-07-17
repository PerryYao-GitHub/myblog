<script>
import $ from 'jquery'
import {ref} from "vue";
import {useStore} from "vuex";
import router from "@/router";
import ContainerField from "@/components/ContainerField.vue";

export default {
    name: "ListView",
    components: {
        ContainerField: ContainerField,
    },

    setup: () => {
        // 获取用户列表
        let users = ref([]);
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/userlist/",
            type: "get",
            success: (resp) => {
                // console.log(resp);
                users.value = resp;
            }
        });

        // 打卡用户资料卡
        const store = useStore();

        const openUserProfile = (userId) => {
            if (store.state.user.isLogin) router.push({
                name: "profile",
                params: {
                    userId: userId,
                }
            });
            else router.push({
                name: "login",
            })
        }

        return {
            users,
            openUserProfile,
        }
    }
}
</script>

<template>
    <ContainerField>
        <div v-for="user in users" :key="user.id" @click="openUserProfile(user.id)">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-1">
                            <img class="img-fluid" :src="user.photo" alt="profile">
                        </div>
                        <div class="col-11">
                            <div class="username">{{ user.username }}</div>
                            <div class="follow-count">Fans: {{ user.followerCount }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ContainerField>
</template>

<style scoped>
.card {
    margin-bottom: 10px;
}
.card:hover {
    box-shadow: 2px 2px 10px lightgray;
    transition: 500ms;
}
.username {
    font-weight: bold;
    cursor: pointer;
}
.follow-count {
    font-size: 12px;
    color: grey;
}
</style>