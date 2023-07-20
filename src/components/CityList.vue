<script>

export default {
    data() {
        return {
            info: "j"
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

                    (async () => {
                        await this.$store.dispatch("getCity", { lat, long }).then((res) => { this.info = res })
                    })()




                })
            }
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
    <div class="container">
        <ul class="city-list">
            <li class="city-list-item" v-for="city in cityList">
                <CityCard :city="city" />
            </li>
        </ul>
    </div>
</template>
