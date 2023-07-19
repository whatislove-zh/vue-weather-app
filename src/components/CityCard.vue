<script>
export default {
    data() {
        return {
            currentCityInfo: this.city.list[0]
        }
    },
    props: {
        city: {
            type: Object,
        },

    },
}
</script>
<template>
    <div class="current-weather">
        <div class="city-info">
            <h2 class="city-name">{{ city.city.name }}</h2>
            <p class="city-description">{{ city.list[0].weather[0].description }}</p>
            <img class="weather-img" :src="`http://openweathermap.org/img/wn/${city.list[0].weather[0].icon}@2x.png`
                " alt="weather-icon" />
        </div>
        <div div class=" temp-info">
            <h2 class="temp-info-main">{{ Math.trunc(city.list[0].main.temp) }} °C</h2>
            <h2 class="temp-info-feels">Feels like: {{ city.list[0].main.feels_like }} °C</h2>
        </div>
    </div>
</template>