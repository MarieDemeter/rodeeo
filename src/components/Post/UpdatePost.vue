<template>
	<v-container>
		<div v-if="!error" class="card m-auto w-50">
			<h2>Modifier le post</h2>
			<form @submit.prevent="updatePost">
				<div class="form-group">
					<label for="text">Nouveau text du post :</label>
					<input type="text" class="form-control" id="text" v-model="post.text" required>
				</div>
				<div class="form-group">
					<label for="image">Nouvelle URL de votre image :</label>
					<input type="text" class="form-control" id="image" v-model="post.image" required>
				</div>
				<div class="form-group">
					<label for="image">Nombre de likes :</label>
					<input type="number" class="form-control" id="image" v-model="post.likes" required>
				</div>
				<div class="form-group">
					<label for="tags">Nouveaux tags (séparés par une virgule):</label>
					<input type="text" class="form-control" id="tags" v-model="post.tags" required>
				</div>
				<button type="submit" class="btn btn-cream">Modifier</button>
			</form>
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
			post: {},
			error: false,
			postId: null,
		}
	},
	methods: {
		async getPost() {
			try {
				let postData = await axios.get("/post/" + this.postId);
				if (postData.data) {
					this.post = postData.data;
					this.post.tags = postData.data.tags.join();
				} else {
					this.error = true;
				}
			} catch (e) {
				this.error = true;
				console.log(e);
			}
		},
		async updatePost() {
			let formData = new Object();
			formData.text = this.post.text;
			formData.image = this.post.image;
			formData.likes = this.post.likes;
            const tags = this.post.tags.split(",");
            formData.tags = tags;

			try {
				await axios.put("/post/" + this.postId, formData);
                this.$router.push({ name: 'Post', params: { id: this.postId } });
			} catch (e) {
				this.error = true;
				console.log(e);
			}
		},
	},
	mounted() {
		this.postId = this.$route.params.id;
		this.getPost();
	}
}
</script>
