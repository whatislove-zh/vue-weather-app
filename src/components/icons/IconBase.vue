<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 24 24" :aria-labelledby="iconName"
        role="presentation">
        <title :id="iconName" lang="en">{{ iconName }} icon</title>
        <g :fill="fill" :stroke="stroke">
            <slot />
        </g>
    </svg>
</template>
  
<script>
export default {
    props: {
        iconName: {
            type: String,
            default: 'box'
        },
        width: {
            type: [Number, String],
            default: 40
        },
        height: {
            type: [Number, String],
            default: 40
        },
        fill: {
            type: String,
            default: 'none'
        },
        stroke: {
            type: String,
            default: 'black'
        },
    }
}
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  margin-bottom: -2px; /* yes, I'm that particular about formatting */
}
</style>
  
