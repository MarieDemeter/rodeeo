<template>
    <!-- Comments -->
    <Comment v-for="comment in comments" :key="comment.id"/>
</template>

<script>
import axios from "axios";
import Comment from "@/components/Comment/Comment.vue";

export default {
    data() {
        return {
            postId: false,
            comments: [],
            error: false
        }
    },
    components: {
        Comment,
    },
    methods: {
        async printComments(postId) {
            try {
                let commentsData = await axios.get("/post/" + postId + "/comment");
                if (commentsData.data) {
                    this.comments = commentsData.data.data.map((comment) => {
                        return {
                            id: comment.id,
                            message: comment.message,
                            owner: {
                                firstName: comment.owner.firstName,
                                lastName: comment.owner.lastName,
                            }
                        };
                    });
                }
            } catch (e) {
                this.error = true;
                console.log(e);
            }
        },
    },
    mounted() {
        this.postId = this.$route.params.id;
        this.printComments(this.postId);
    }
}
</script>
