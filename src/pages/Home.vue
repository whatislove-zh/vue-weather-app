<script>
export default {
    computed: {
        favoriteOverload() {
            return this.$store.state.favorite.favoriteOverload
        },
        homeOverload() {
            return this.$store.state.cityList.quantityError
        },

    },
    methods: {
        favoriteCloseError() {
            this.$store.commit("favoriteOverloadStatus", { status: false })
        },
        homeCloseError() {
            this.$store.commit("changeErrorStatus", { status: false })
        }
    },
    watch: {
        favoriteOverload: {
            handler() {
                setTimeout(() => { this.favoriteCloseError() }, 3000)
            }

        },
        homeOverload: {
            handler() {
                setTimeout(() => { this.homeCloseError() }, 3000)
            }

        }
    }
}
</script>
<template>
    <main class="main">
        <Search />
        <CityList />

        <div v-show="favoriteOverload" class="error-modal">
            <h2 class="error-message">{{ $t("overflow.favorite") }}</h2>
            <icon-base @click="favoriteCloseError()" class="error-close" fill="black" stroke="none"
                iconName="Confirm"><confirm-icon /></icon-base>
        </div>
        <div v-show="homeOverload" class="error-modal">
            <h2 class="error-message">{{ $t("overflow.home") }}</h2>
            <icon-base @click="homeCloseError()" class="error-close" fill="black" stroke="none"
                iconName="Confirm"><confirm-icon /></icon-base>
        </div>

    </main>
</template>