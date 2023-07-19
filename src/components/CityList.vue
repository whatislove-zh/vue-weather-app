<script>
import SpinnerLoaderVue from "./SpinnerLoader.vue"
import CityCard from "./CityCard.vue"

export default {
    props: {
        loading: {
            type: Boolean,
            default: true
        },
        fetchError: {
            type: String | null,
            default: null
        }
    },


    computed: {
        cityList() {
            return this.$store.state.cityList.all
        },

    },
}
</script>
<template>
    <div class="container">
        <SpinnerLoaderVue :loading="loading" />

        <ul>
            <li v-for="city in cityList">
                <CityCard :city="city" />
            </li>
        </ul>



    </div>
</template>
