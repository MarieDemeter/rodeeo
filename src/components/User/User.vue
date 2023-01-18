<template>
    <v-container>
        <div v-if="!error" class="card m-auto w-50">
            <div class="card-body m-auto text-center">
                <h5 class="card-title">{{ user.firstName }} {{ user.lastName }}</h5>
                <img :src="user.picture" alt="image de l'utilisateur"/>
                <div class="card-body">
                    <!-- Update user -->
                    <router-link :to="{ name: 'UpdateUser', params: { id: userId } }" class="btn btn-light-cream m-2">
                        Modifier l'utilisateur
                    </router-link>

                    <!-- Delete user -->
                    <button @click="deleteUser" class="btn btn-light-cream m-2">
                        Supprimer l'utilisateur
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
            userId: false,
            user: {},
            error: false
        }
    },
    methods: {
        async printUser() {
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
        deleteUser() {
            try {
                axios.delete('user/' + this.userId);
                alert("L'utilisateur a bien été supprimé");
                this.$router.push({ name: 'Users' });
            } catch (e) {
                this.error = true;
                console.log(e);
            }
        },
    },
    mounted() {
        this.userId = this.$route.params.id;
        this.printUser();
    }
}
</script>
