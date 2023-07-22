<script>

export default {
    methods: {
        languageToggle() {
            const language = this.$i18n.locale === "uk" ? "en" : "uk"
            this.$i18n.locale = language
        }
    }
}



</script>
<template>
    <header class="header">
        <div class="container">
            <div class="header-wrapper">
                <h2 class="header-logo">{{ $t("logo") }}</h2>
                <nav class="nav">
                    <RouterLink class="header-link link" to="/">{{ $t("nav.home") }}</RouterLink>
                    <RouterLink class="header-link link" to="/favorite">{{ $t("nav.favorite") }}</RouterLink>
                    <button @click="languageToggle()" class="changeLanguage header-link">{{ $t("changeLanguage") }}</button>
                </nav>
            </div>
        </div>
    </header>
</template>