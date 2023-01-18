<template>
    <v-container>
        <h2>OK</h2>
        <div v-if="!error">
            <div class="row">
                <div v-for="post in posts" :key="post.id" class="card col-3 mb-3">
                    <img :src="post.image" alt="image de l'article"
                        style="width:auto; height:300px; object-fit: cover;" />
                    <div class="card-body text-center">
                        <div class="d-flex justify-content-around">
                            <p v-for="tag in post.tags" class="text-uppercase text-bold text-cream">
                                {{ tag }}
                            </p>
                        </div>
                        <h4 class="card-title">{{ post.text }}</h4>
                        <router-link :to="{ name: 'Post', params: { id: post.id } }"
                            class="btn btn-light-cream">Voir</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Une erreur est survenue lors du chargement des articles de l'auteur.</p>
        </div>
    </v-container>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            posts: [],
            error: false
        }
    },
    methods: {
        async reload(userId) {
            try {
                let postsData = await axios.get("/user/" + userId + '/post');

                this.posts = postsData.data.data.map((post) => {
                    return {
                        id: post.id,
                        text: post.text,
                        image: post.image,
                        likes: post.likes,
                        tags: post.tags,
                    };
                });
            } catch (e) {
                this.error = true;
                console.log(e);
            }
        }
    },
    mounted() {
        this.reload(this.$route.params.userId);
    }
}
</script>
