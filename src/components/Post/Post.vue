<template>
    <v-container>
        <div v-if="!error" class="card m-auto w-50">
            <div class="card-body">
                <h5 class="card-title">{{ post.text }}</h5>
                <img :src="post.image" alt="image de l'article" class="w-100" style="object-fit: cover" />
                <div class="card-body">
                    <div class="d-flex justify-content-center align-items-center">
                        <p class="m-0">{{ post.likes }} <v-icon icon="mdi-heart"></v-icon>
                            Par: {{ owner.firstName }} {{ owner.lastName }}</p>

                        <!-- Post by user-->
                        <router-link :to="{ name: 'PostByOwner', params: { userId: ownerId } }"
                            class="btn btn-light-cream m-2">
                            Voir les posts de {{ owner.firstName }} {{ owner.lastName }}
                        </router-link>
                    </div>
                    <!-- Comments -->
                    <ul v-for="comment in comments" class="m-4">
                        <li><span class="text-cream">{{ comment.message }}</span>
                            {{ comment.owner.firstName }} {{ comment.owner.lastName }} <button @click="deleteComment(comment.id)" class="btn btn-light-cream">Supprimer</button></li>
                    </ul>
                    <form @submit.prevent="addComment" class="w-50 bg-light-cream p-3 mb-3">
                        <div class="form-group">
                            <label for="message">Commentaire :</label>
                            <input type="text" class="form-control" id="message" v-model="newComment.message" required>
                        </div>
                        <div class="form-group">
                            <label for="image">Identifiant de l'utilisateur :</label>
                            <input type="text" class="form-control" id="image" v-model="newComment.owner" required>
                        </div>
                        <button type="submit" class="btn btn-cream">Commenter</button>
                    </form>

                    <!-- Update Post -->
                    <router-link :to="{ name: 'UpdatePost', params: { id: postId } }" class="btn btn-light-cream m-2">
                        Modifier le post
                    </router-link>

                    <!-- Delete Post -->
                    <button @click="deletePost" class="btn btn-light-cream m-2">
                        Supprimer le post
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Nous rencontrons une erreur, veuillez nous excuser.</p>
        </div>
    </v-container>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            postId: false,
            post: {},
            owner: {},
            ownerId: false,
            newComment: {
                message: "",
                owner: "60d0fe4f5311236168a109ca",
            },
            comments: [],
            error: false
        }
    },
    methods: {
        async printPost(postId) {
            try {
                let postData = await axios.get("/post/" + postId);
                let commentsData = await axios.get("/post/" + postId + "/comment");
                if (postData.data) {
                    this.post = postData.data;
                    this.owner = postData.data.owner;
                    this.ownerId = this.owner.id;
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
                } else {
                    this.error = true;
                }
            } catch (e) {
                this.error = true;
                console.log(e);
            }
        },

        deletePost() {
            try {
                axios.delete('post/' + this.postId);
                alert("Le post a bien été supprimé");
                this.$router.push({ name: 'Posts' });
            } catch (e) {
                this.error = true;
                console.log(e);
            }
        },

        async addComment() {
            let formData = new Object();
            formData.post = this.postId;
            formData.message = this.newComment.message;
            formData.owner = this.newComment.owner;

            try {
                let comment = await axios.post('/comment/create', formData);
                window.location.reload();
            } catch (error) {
                console.log(error);
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
        this.printPost(this.postId);
    }
}
</script>
