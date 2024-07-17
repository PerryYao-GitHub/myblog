<script>
import $ from 'jquery';
import {useStore} from "vuex";

export default {
    name: "ProfileViewPosts",

    props: {
        posts: {
            type: Object,
            required: true,
        },
        isMe: {
            type: Boolean,
            required: true,
        },
    },

    setup: (props, context) => {
        const store = useStore();
        const deletePost = (postId) => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/post/",
                type: "DELETE",
                data: {
                    post_id: postId,
                },
                headers: {
                    Authorization: "Bearer " + store.state.user.access,
                },
                success: () => {
                    context.emit("deletePost", postId);
                }
            });
        }
        return {
            deletePost,
        }
    },
}
</script>

<template>
<div class="card">
    <div class="card-body">
        <div v-for="post in posts.posts" v-bind:key="post.postId">
            <div class="card post">
                <div><button v-if="isMe" class="btn btn-danger btn-sm" @click="deletePost(post.id)">Delete</button></div>
                <div class="card-body">
                    {{ post.content }}
                </div>
            </div>

        </div>
    </div>
</div>
</template>

<style scoped>
.post {
    margin-bottom: 10px;
}

button {
    float: right;
}
</style>