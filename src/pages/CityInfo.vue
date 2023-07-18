<script>
import { useRoute } from "vue-router";

export default {

    setup() {
        const route = useRoute();
        console.log( route.params)
    }
}

</script>
<template>
    <div>
        <h2>
            {{ $route.params.name }}
        </h2>
        
    </div>
</template>