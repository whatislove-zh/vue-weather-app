<script>
import axios from "axios"

export default {
    data() {
        return {
            search: "",
            searchResult: [],
            searchTimeout: null,
            searchError: null

        }
    },
    methods: {
        getSearchResult() {
            clearTimeout(this.searchTimeout)
            this.searchError = null
            this.searchTimeout = setTimeout(async () => {

                if (this.search !== "") {
                    try {
                        const result = await axios.get(
                            `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.search}.json?access_token=${import.meta.env.VITE_API_MAP}&types=place`
                        );
                        this.searchResult = JSON.stringify(result.data.features)
                    } catch (err) {
                        this.searchError = err.message
                        console.log(err)
                    }
                }
                else {
                    this.searchResult = []
                }
            }, 1000)

        },
    }
}
</script>
<template>
    <div class="container search-block">
        <div class="search-wrapper">

            <input class="search-input" v-model="search" @input="getSearchResult()" type="text"
                placeholder="Search your city" />
            <p v-if="searchError" class="error-message">Something went wrong. <br /> Error: {{ searchError }}</p>
            <p v-if="searchResult.length < 1" class="error-message">I don't know such a place, try to enter a
                valid place</p>
            <div class="search-results">
                <ul class="search-result-list">
                    <li v-if="searchResult.length > 1" v-for="city in JSON.parse(searchResult)" :key="city.id" @click="">
                        {{ city.place_name }}
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>