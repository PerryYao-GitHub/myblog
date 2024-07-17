<script>
import {reactive} from "vue";
import {useRoute} from "vue-router";
import $ from 'jquery';
import {useStore} from "vuex";
import {computed} from "vue";

import ContainerField from "@/components/ContainerField.vue";
import ProfileViewInfo from "@/components/ProfileViewInfo.vue";
import ProfileViewPosts from "@/components/ProfileViewPosts.vue";
import ProfileViewWriter from "@/components/ProfileViewWriter.vue";

export default {
    name: 'ProfileView',

    components: {
        ContainerField,
        ProfileViewInfo,
        ProfileViewPosts,
        ProfileViewWriter,
    },

    setup: () => {
        const route = useRoute();
        const store = useStore();

        let userId = parseInt(route.params.userId);
        // console.log(userId);
        // reactive 只能接受对象
        const user = reactive({
            // id: 1,
            // username: "Anon",
            // followersCnt: 1,
            // hasFollowed: true,
        });

        const posts = reactive({
            // postCnt: 3,
            // posts: [
            //     {
            //         postId: 1,
            //         userId: 1,
            //         content: "Soyo san love!!"
            //     }, {
            //         postId: 2,
            //         userId: 1,
            //         content: "Soyo san love!!"
            //     }, {
            //         postId: 3,
            //         userId: 1,
            //         content: "Soyo san love!!"
            //     },
            // ],
        })

        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
            type: "get",
            data: {
                user_id: userId,
            },
            headers: {
                Authorization: "Bearer " + store.state.user.access,
            },
            success: (resp) => {  // 拉取用户信息
                // console.log(resp);
                user.id = resp.id;
                user.username = resp.username;
                user.photo = resp.photo;
                user.followersCnt = resp.followerCount;
                user.hasFollowed = resp.is_followed;
            }
        })


        $.ajax({  // 拉取用户发帖
            url: "https://app165.acapp.acwing.com.cn/myspace/post/",
            type: "get",
            data: {
                user_id: userId,
            },
            headers: {
                Authorization: "Bearer " + store.state.user.access,
            },
            success: (resp) => {
                // console.log(resp);
                posts.posts = resp;
                posts.postsCnt = resp.length;
                // console.log(posts.posts);
            }
        })

        const isMe = computed(()=>{ return store.state.user.id === userId })

        const follow = () => {
            if (user.hasFollowed) return;
            user.hasFollowed = true;
            user.followersCnt ++;
        }

        const unfollow = () => {
            if (!user.hasFollowed) return;
            user.hasFollowed = false;
            user.followersCnt --;
        }

        const submitPost = (editPostContent) => {
            posts.postCnt ++;
            posts.posts.unshift({
                postId: posts.postCnt,
                // userId: 1,
                content: editPostContent,
            });
        }

        const deletePost = (postId) => {
            posts.posts = posts.posts.filter( (post) => { return post.id !== postId } );
            posts.postsCnt = posts.posts.lenghth;
        }

        return {
            user,
            follow,
            unfollow,
            posts,
            submitPost,
            isMe,
            deletePost,
        }
    }
}
</script>

<template>
    <ContainerField>
        Actions
        <div class="row">
            <div class="col-3">
<!--                User Info-->
                <ProfileViewInfo :user="user" @follow="follow" @unfollow="unfollow"/> <!-- 父组件对子组件传消息-->
                <ProfileViewWriter v-if="isMe" @submitPost="submitPost" />
            </div>
            <div class="col-9">
<!--                Actions List-->
                <ProfileViewPosts :posts="posts" :isMe="isMe" @deletePost="deletePost"/>
            </div>
        </div>
    </ContainerField>
</template>

<style scoped>

</style>