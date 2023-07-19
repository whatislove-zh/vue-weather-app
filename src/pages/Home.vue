<script>
import Search from "../components/Search.vue"
import CityList from "../components/CityList.vue"
import axios from "axios"


export default {
    data() {
        return {
            cityInfo: {},
            errorMessage: null,
            loading: true
        }

    },

    created() {
        this.getDataByCoord()
    },
    methods: {
        getDataByCoord() {
            navigator.geolocation.getCurrentPosition((position) => {
                const long = position.coords.longitude
                const lat = position.coords.latitude

                console.log("long", long)
                console.log("lat", lat)

                this.getData(lat, long)

            })
        },
        async getData(lat, long) {
            this.loading = true
            this.error = null
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_API_WEATHER}`
                );
                //console.log(this.$store)
                this.$store.dispatch("addCity", response.data)

                this.loading = false

            } catch (error) {
                console.log(error.response.data.message)
                this.errorMessage = error.response.data.message
            }
        }
    }
}

</script>
<template>
    <main class="main">
        <Search />
        <CityList :error="errorMessage" :loading="loading" />
    </main>
</template>