<script>

export default {
    props: {
        favorite: {
            type: Boolean,
            default: false
        }

    },

    created() {
        this.getDataByCoord()
    },
    methods: {
        getDataByCoord() {
            if (this.$store.state.cityList.all.length === 0) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const long = position.coords.longitude;
                    const lat = position.coords.latitude;
                    this.$store.dispatch("getCity", { lat, long })
                })
            }
        },
    },
    computed: {
        cityList() {
            return this.$route.path === "/" ? this.$store.state.cityList.all : this.$store.state.favorite.favoriteList
        },
        loading() {
            return this.$store.state.cityList.statusInfo.loading
        }

    },
}
</script>
<template>
    <div class="container">
        <ul class="city-list">
            <li class="city-list-item" v-for="city in cityList">
                <CityCard :city="city" :favorite="favorite" />
            </li>
            <SpinnerLoaderVue v-show="loading" />
        </ul>
    </div>
</template>
