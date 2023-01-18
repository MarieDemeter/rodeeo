<template>
	<v-container>
		<h2>Créer un nouvel utilisateur</h2>
		<div v-if="!create">
			<form @submit.prevent="createUser">
				<div class="form-group">
					<label for="text">Prénom :</label>
					<input type="text" class="form-control" id="text" v-model="newUser.firstName" required>
				</div>
				<div class="form-group">
					<label for="image">Nom :</label>
					<input type="text" class="form-control" id="image" v-model="newUser.lastName" required>
				</div>
				<div class="form-group">
					<label for="tags">Adresse email :</label>
					<input type="text" class="form-control" id="tags" v-model="newUser.email" required>
				</div>
				<div class="form-group">
					<label for="owner">Photo (optionnel) :</label>
					<input type="text" class="form-control" id="owner" v-model="newUser.picture">
				</div>
				<button type="submit" class="btn btn-cream">Publier</button>
			</form>
		</div>
		<div v-else>
			<p class="text-danger">Vous venez de créer un utilisateur</p>
			<p>Votre identifiant est {{ newUser.id }} </p>
		</div>

	</v-container>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			newUser: {
				firstName: '',
				lastName: '',
				email: '',
				picture: '',
			},
			create: false,
		};
	},
	methods: {
		async createUser() {
			let formData = new Object();
			formData.firstName = this.newUser.firstName;
			formData.lastName = this.newUser.lastName;
			formData.email = this.newUser.email;
			formData.picture = this.newUser.picture;

			try {
				let user = await axios.post('user/create', formData);
				this.create = true;
				this.newUser.id = user.data.id;
				sessionStorage.setItem("id", user.data.id);
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>
