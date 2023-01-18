<template>
    <v-container>
        <div v-if="!error" class="card m-auto w-50">
            <div class="card-body">
                <h5 class="card-title">{{ post.text }}</h5>
                <img :src="post.image" alt="image de l'article" class="w-100" style="object-fit: cover" />
                <div class="card-body">
                    <p class="card-text">{{ post.likes }} <v-icon icon="mdi-heart"></v-icon></p>
                    <p class="card-text">Par: {{ owner.firstName }} {{ owner.lastName }}</p>
                    <router-link :to="{ name: 'PostByOwner', params: { userId: ownerId } }"
                        class="btn btn-light-cream">Voir les posts de {{ owner.firstName }} {{
    owner.lastName
                        }}</router-link>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Erreur de chargement.</p>
        </div>
    </v-container>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            post: {},
            owner: {},
            ownerId: false,
            error: false
        }
    },
    methods: {
        async printPost(postId) {
            try {
                let postData = await axios.get("/post/" + postId);
                if (postData.data) {
                    this.post = postData.data;
                    this.owner = postData.data.owner;
                    this.ownerId = this.owner.id;
                } else {
                    this.error = true;
                }
            } catch (e) {
                this.error = true;
                console.log(e);
            }
        }
    },
    mounted() {
        this.printPost(this.$route.params.id);
    }
}
</script>
