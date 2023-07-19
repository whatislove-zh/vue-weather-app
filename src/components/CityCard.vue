<script>
export default {
    props: {
        city: {
            type: Object,
        },
        
    },
}
</script>
<template>
    <h2>{{ city.name }}</h2>
</template>