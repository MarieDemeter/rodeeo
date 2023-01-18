<template>
    <v-container>
        <h2>Ecrire un nouveau post</h2>
        <form @submit.prevent="submitPost">
            <div class="form-group">
                <label for="text">Texte :</label>
                <input type="text" class="form-control" id="text" v-model="newPost.text" required>
            </div>
            <div class="form-group">
                <label for="image">URL de votre image :</label>
                <input type="text" class="form-control" id="image" v-model="newPost.image" required>
            </div>
            <div class="form-group">
                <label for="tags">Tags du post (séparés par un virgule):</label>
                <input type="text" class="form-control" id="tags" v-model="newPost.tags" required>
            </div>
            <div class="form-group">
                <label for="owner">Identifiant de l'utilisateur :</label>
                <input type="text" class="form-control" id="owner" v-model="newPost.owner">
            </div>
            <button type="submit" class="btn btn-cream">Publier</button>
        </form>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            newPost: {
                text: '',
                image: '',
                likes: 0,
                tags: [],
                owner: '60d0fe4f5311236168a109ca',
            },
        };
    },
    methods: {
        async submitPost() {
            let formData = new Object();
            formData.text = this.newPost.text;
            formData.image = this.newPost.image;
            formData.likes = this.newPost.likes;
            formData.owner = this.newPost.owner;

            const tags = this.newPost.tags.split(",");
            formData.tags = tags;

            console.log(formData);

            try {
                let post = await axios.post('post/create', formData);
                this.$router.push({ name: 'Post', params: { id: post.data.id } });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
