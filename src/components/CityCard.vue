<script>
import Forecast from './Forecast.vue'

export default {
    props: {
        city: {
            type: Object,
        },
        favorite: {
            type: Boolean,
            default: false
        }

    },
    components: {
        Forecast
    },
    data() {
        return {
            currentCityInfo: this.city.list[0],
            confirmHiddenStatus: true,
            dayOrWeek: "day",
            week: {},
            weekArr: []
        }
    },
    computed: {
        favoriteStatus() {
            return this.city.favorite
        },
        hourlyData() {
            return JSON.parse(JSON.stringify(this.city.list)).splice(0, 8)
        },
        fillColor() {
            return this.favoriteStatus ? "#ff6200" : "none"
        },
    },
    methods: {
        addToFavorite() {
            if (this.favoriteStatus) {
                this.$store.dispatch("removeFavorite", this.city.city)
            } else {
                this.$store.dispatch("addFavorite", this.city)
            }
        },
        deleteItem() {
            this.$store.dispatch("removeCity", this.city.city)
            this.confirmHiddenStatus = true
        },
        confirmHiddenToggle() {
            if (this.confirmHiddenStatus) {
                this.confirmHiddenStatus = false
            } else {
                this.confirmHiddenStatus = true
            }
        },
        dayChoose() {
            this.dayOrWeek = "day"
        },
        weekChoose() {
            this.dayOrWeek = "week"
        },
        calculateNext5Days() {
            for (let val of this.city.list) {
                const data = new Date(val.dt * 1000).toLocaleDateString(undefined, { month: "numeric", day: "numeric" });
                if (!this.week.hasOwnProperty(data)) {
                    this.week[data] = data
                    this.weekArr.push(val)
                }
            }
        },
    },
    created() {
        this.calculateNext5Days()
    }
}
</script>
<template>
    <div v-show="!confirmHiddenStatus" @click.self="confirmHiddenToggle()" class="confirm-modal">
        <div class="confirm-modal-wrapper">
            <h2 class="confirm-modal-title">{{$t("deleteConfirm")}}</h2>
            <button class="confirm-modal-btn btn-yes" @click="deleteItem()">{{$t("yes")}}</button>
            <button class="confirm-modal-btn btn-no" @click="confirmHiddenToggle()">{{$t("no")}}</button>
        </div>
    </div>
    <div class="day-week">
        <button class="day-button" @click="dayChoose()">{{$t("day")}}</button>
        <button class="week-button" @click="weekChoose()">{{$t("week")}}</button>
    </div>
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
    <div class="controls">
        <icon-base v-show="!favorite" class="delete-button" @click="confirmHiddenToggle()" stroke="black"
            iconName="Delete"><trash-icon /></icon-base>
        <icon-base class="favorite-button" @click="addToFavorite()" :fill="fillColor" stroke="#ff6200"
            iconName="Add to favorite"><heart-icon /></icon-base>
    </div>
    <Forecast v-if="dayOrWeek === 'day'" :data="hourlyData" :cityName="city.city.name" />
    <Forecast v-else :data="weekArr" :dayOr="dayOrWeek" :cityName="city.city.name" />
</template>

