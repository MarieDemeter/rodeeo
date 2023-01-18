<template>
	<v-container>
		<div v-if="!error" class="card m-auto w-50">
			<h2>Modifier l'utilisateur</h2>
			<form @submit.prevent="updateUser">
				<div class="form-group">
					<label for="text">Prénom :</label>
					<input type="text" class="form-control" id="text" v-model="user.firstName" required>
				</div>
				<div class="form-group">
					<label for="image">Nouvelle URL de votre image :</label>
					<input type="text" class="form-control" id="image" v-model="user.lastName" required>
				</div>
				<div class="form-group">
					<label for="picture">Photo du profil :</label>
					<input type="text" class="form-control" id="picture" v-model="user.picture" required>
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
			user: {},
			error: false,
			userId: null,
		}
	},
	methods: {
		async getUser() {
			try {
				let userData = await axios.get("/user/" + this.userId);
				if (userData.data) {
					this.user = userData.data;
				} else {
					this.error = true;
				}
			} catch (e) {
				this.error = true;
				console.log(e);
			}
		},
		async updateUser() {
			let userData = new Object();
			userData.firstName = this.user.firstName;
			userData.lastName = this.user.lastName;
			userData.picture = this.user.picture;

			try {
				await axios.put("/user/" + this.userId, userData);
                this.$router.push({ name: 'User', params: { id: this.userId } });
			} catch (e) {
				this.error = true;
				console.log(e);
			}
		},
	},
	mounted() {
		this.userId = this.$route.params.id;
		this.getUser();
	}
}
</script>
