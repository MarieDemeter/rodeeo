<template>
	<v-container>
		<h2>Liste des utilisateurs</h2>
		<div v-if="!error">
			<div class="row">
				<div v-for="user in users" :key="user.id" class="card mb-3 col-3">
					<img :src="user.picture" alt="photo de l'utilisateur"
						style="object-fit: cover; width: 100px;" class="m-auto" />
					<div class="card-body text-center">
						<h5 class="card-title text-cream">{{ user.title }} {{ user.firstName }} {{ user.lastName }}</h5>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<p>Une erreur est survenue lors du chargement des utilisateurs.</p>
		</div>
	</v-container>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			users: [],
			error: false
		}
	},
	methods: {
		async reload() {
			try {
				let usersData = await axios.get("user");
                console.log(usersData);
				this.users = usersData.data.data.map((user) => {
					return {
						id: user.id,
						title: user.title,
						firstName: user.firstName,
						lastName: user.lastName,
						picture: user.picture,
					};
				});
			} catch (e) {
				this.error = true;
				console.log(e);
			}
		}
	},
	mounted() {
		this.reload();
	}
}
</script>
