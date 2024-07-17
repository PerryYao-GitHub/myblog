<script>
// import {computed} from "vue";
import $ from 'jquery';
import {useStore} from "vuex";

export default {
    name: "ProfileViewInfo",

    props: {
        user: {
            type: Object,
            required: true,
        }
    },

    setup: (props, context) => {  //setup 函数有两个参数: props 和 context. 这些参数提供了对组件实例和其上下文的访问
        const store = useStore();

        const follow = () => {  // 子组件向父组件传信息
            // console.log("follow");
            // console.log(props.user.hasFollowed)
            // console.log(props.user.id)
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
                type: "post",
                data: {
                    target_id: props.user.id,
                },
                headers: {
                    Authorization: "Bearer " + store.state.user.access,
                },
                success: (resp) => {
                    if (resp.result === "success") context.emit("follow");  // 调用父组件的follow函数
                },
            });
        }

        const unfollow = () => {
            // console.log("unfollow");
            // console.log(props.user.hasFollowed)
            // console.log(props.user.id)
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
                type: "post",
                data: {
                    target_id: props.user.id,
                },
                headers: {
                    Authorization: "Bearer " + store.state.user.access,
                },
                success: (resp) => {
                    if (resp.result === "success") context.emit("unfollow");  // 调用父组件的unfollow函数
                },
            });
        }

        return {
            follow,
            unfollow,
        }
    }


}
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-4">
                    <img class="img-fluid img-user-photo" :src="user.photo" alt="user-profile">
                </div>
                <div class="col-8">
                    <div class="username">{{ user.username }}</div>
                    <div class="fans">Fans: {{ user.followersCnt }}</div>
                    <button @click="follow"  v-if="!user.hasFollowed" type="button" class="btn btn-secondary btn-sm">+ Follow</button>
                    <button @click="unfollow" v-else type="button" class="btn btn-secondary btn-sm">Unfollow</button>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.img-user-photo {
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.username {
    font-weight: bold;
}

.fans {
    font-size: 12px;
    color: gray;
}

button {
    padding: 2px 4px;
    font-size: 12px;
}
</style>