<script>
export default {
    data() {
        return {
            errorMessage: null,
            loading: false
        }
    },
}
</script>

<template>
    <div class="container favorite-block">
        <CityList :error="errorMessage" :loading="loading" />
    </div>
</template>