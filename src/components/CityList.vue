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

        <ul class="city-list">
            <li class="city-list-item" v-for="city in cityList">
                <CityCard :city="city" />
            </li>
        </ul>



    </div>
</template>
