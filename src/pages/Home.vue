<script>
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
            if (this.$store.state.cityList.all.length === 0) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const long = position.coords.longitude
                    const lat = position.coords.latitude
                    this.getData(lat, long)
                })
            }
            this.loading = false
        },
        async getData(lat, long) {
            this.loading = true
            this.error = null
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&lang=${"us"}&appid=${import.meta.env.VITE_API_WEATHER}`
                );
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