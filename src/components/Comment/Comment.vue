<template>
    <!-- Comments -->
    <ul v-for="comment in comments" class="m-4">
        <li><span class="text-cream">{{ comment.message }}</span>
            {{ comment.owner.firstName }} {{ comment.owner.lastName }} <button @click="deleteComment(comment.id)"
                class="btn btn-light-cream">Supprimer</button></li>
    </ul>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            postId: false,
            comments: [],
            error: false
        }
    },
    methods: {
        async printComment(postId) {
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
        deleteComment(commentId) {
            try {
                axios.delete('comment/' + commentId);
                alert("Le commentaire a bien été supprimé");
                window.location.reload();
            } catch (e) {
                this.error = true;
                console.log(e);
            }
        },
    },
    mounted() {
        this.postId = this.$route.params.id;
        this.printComment(this.postId);
        if (sessionStorage.getItem("id")) {
            this.newComment.owner = sessionStorage.getItem("id");
        }
    }
}
</script>
