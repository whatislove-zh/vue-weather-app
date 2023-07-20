<script>

export default {

    props: {
        loading: {
            type: Boolean,
            default: true
        },
        fetchError: {
            type: String | null,
            default: null
        },
    },




    computed: {
        cityList() {
            return this.$route.path === "/" ? this.$store.state.cityList.all : this.$store.state.favorite.favoriteList
        },

    },
}
</script>
<template>
    <div class="error-message" v-if="fetchError !== null">{{ fetchError }}</div>
    <div v-else class="container">
        <SpinnerLoaderVue :loading="loading" />
        <ul class="city-list">
            <li class="city-list-item" v-for="city in cityList">
                <CityCard :city="city" />
            </li>
        </ul>
    </div>
</template>
