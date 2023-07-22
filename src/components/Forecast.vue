<script>
import Chart from "./Chart.vue"

export default {
    props: {
        data: {
            type: Array,
            default: []
        },
        dayOr: {
            type: String,
            default: "day"
        },
        cityName: {
            type: String,
            default: "name"
        }
    },
    components: {
        Chart,
    },
    methods: {
        timeFormat(dt_txt) {
            const time = new Date(dt_txt)
            return `${time.getHours()}:${time.getMinutes()}0`
        },
        dateFormat(dt_txt) {
            const locale = this.$i18n.locale
            const data = new Date(dt_txt).toLocaleDateString(locale, { month: "short", day: "numeric" });
            return `${data}`
        }
    }
}


</script>

<template>
    <div class="hourly-weather">
        <h2 v-if="dayOr === 'day'" class="hourly-weather-title">{{ $t("hourlyTitle") }}</h2>
        <h2 v-else="dayOr === 'day'" class="hourly-weather-title">{{ $t("weekTitle") }}</h2>
        <hr />
        <div class="wrapper">
            <div class="hourly-weather-list">
                <div class="hourly-weather-item" v-for="weather in data">
                    <p v-if="dayOr === 'day'" class="time">{{ timeFormat(weather.dt_txt) }}</p>
                    <p v-else class="time">{{ dateFormat(weather.dt_txt) }}</p>
                    <img class="weather-img" :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                        " alt="weather-icon" />
                    <p class="description">{{ weather.weather[0].description }}</p>
                    <p class="temp">{{ Math.trunc(weather.main.temp) }}°C</p>
                </div>
            </div>
        </div>
    </div>
    <Chart :data="data" :duration="dayOr" :chartId="cityName" />
</template>