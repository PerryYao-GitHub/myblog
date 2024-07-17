<script>
import {ref} from "vue";
import $ from 'jquery';
import {useStore} from "vuex";

export default {
    name: "ProfileViewWriter",

    setup: (props, context) => {
        let editPostContent = ref("");
        const store = useStore();

        const submitPost = () => {
            // console.log(editPostContent.value);
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/post/",
                type: 'post',
                data: {
                    content: editPostContent.value,
                },
                headers: {
                    Authorization: "Bearer " + store.state.user.access,
                },
                success: (resp) => {
                    // console.log(resp)
                    if (resp.result === "success") {
                        context.emit('submitPost', editPostContent.value);
                        editPostContent.value = "";
                    }
                }
            });
        };
        return {
            editPostContent,
            submitPost,
        };
    }
}
</script>

<template>
    <div class="card writer-field">
        <div class="card-body">
            <label for="edit-post" class="form-label">edit</label>
            <textarea v-model="editPostContent" class="form-control" id="edit-post"></textarea>
            <button @click="submitPost" type="button" class="btn btn-primary btn-sm">Post</button>
        </div>
    </div>
</template>

<style scoped>
.writer-field {
    margin-top: 10px;
}

button {
    margin-top: 10px;
}
</style>