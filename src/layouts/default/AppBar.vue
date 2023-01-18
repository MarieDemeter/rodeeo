<template>
    <v-app-bar elevate-on-scroll color="light-cream" class="text-cream">
        <v-app-bar-title> Marie-Déméter DUCROT </v-app-bar-title>
        <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
                <v-btn color="cream" v-bind="props" class="text-uppercase">
                    Articles
                </v-btn>
            </template>

            <v-list>
                <v-list-item v-for="item in articles" :key="item">
                    <router-link :to="{ name: item.route }" class="btn text-cream text-uppercase">{{item.title}}</router-link>
                </v-list-item>
            </v-list>
            
        </v-menu>
        <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
                <v-btn color="cream" v-bind="props" class="text-uppercase">
                    Utilisateurs
                </v-btn>
            </template>

            <v-list>
                <v-list-item v-for="item in articles" :key="item">
                    <router-link :to="{ name: 'Posts' }" class="btn text-uppercase text-cream">{{item.title}}</router-link>
                </v-list-item>
            </v-list>
            
        </v-menu>
    </v-app-bar>
</template>

<script>
export default {
    data() {
        return {
            articles: [
                {
                    title: "Tous les articles",
                    route: "Posts"
                },
                {
                    title: "Ecrire un article",
                    route: "AddPost"
                },
            ]
        }
    },
}
</script>
