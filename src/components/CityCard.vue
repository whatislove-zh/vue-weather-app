<script>

export default {
    props: {
        city: {
            type: Object,
        },
    },
    data() {
        return {
            currentCityInfo: this.city.list[0],
            favoriteStatus: this.city.favorite
        }
    },
    computed: {
        hourlyData() {
            return JSON.parse(JSON.stringify(this.city.list)).splice(0, 9)
        },
        fillColor() {
            return this.favoriteStatus ? "#ff6200" : "none"
        }
    },
    methods: {
        timeFormat(dt_txt) {
            const time = new Date(dt_txt)
            return `${time.getHours()}:${time.getMinutes()}0`
        },
        addToFavorite() {
            if (this.favoriteStatus) {
                this.favoriteStatus = false
                this.$store.dispatch("removeFavorite", this.city.city)
            } else {
                this.favoriteStatus = true
                this.$store.dispatch("addFavorite", this.city)

            }
        }
    }

}
</script>
<template>
    <icon-base class="favorite-button" @click="addToFavorite()" :fill="fillColor"
        stroke="#ff6200"><heart-icon /></icon-base>
    <div class="current-weather">
        <div class="city-info">
            <h2 class="city-name">{{ city.city.name }}</h2>
            <p class="city-description">{{ currentCityInfo.weather[0].description }}</p>
            <img class="weather-img" :src="`http://openweathermap.org/img/wn/${currentCityInfo.weather[0].icon}@2x.png`
                " alt="weather-icon" />
        </div>
        <div div class=" temp-info">
            <h2 class="temp-info-main">{{ Math.trunc(currentCityInfo.main.temp) }} °C</h2>
            <h2 class="temp-info-feels">Feels like: {{ currentCityInfo.main.feels_like }} °C</h2>
        </div>
    </div>
    <div class="hourly-weather">
        <h2 class="hourly-weather-title">Hourly weather</h2>
        <hr />
        <div class="wrapper">
            <div class="hourly-weather-list">
                <div class="hourly-weather-item" v-for="weather in hourlyData">
                    <p class="time">{{ timeFormat(weather.dt_txt) }}</p>
                    <img class="weather-img" :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                        " alt="weather-icon" />
                    <p class="description">{{ weather.weather[0].description }}</p>
                    <p class="temp">{{ Math.trunc(weather.main.temp) }}°C</p>
                </div>
            </div>
        </div>
    </div>
</template>