<template>
    <div class="v-spinner">
        <div v-bind:style="[spinnerStyle, spinnerDelay1]">
        </div>
        <div v-bind:style="[spinnerStyle, spinnerDelay2]">
        </div>
        <div v-bind:style="[spinnerStyle, spinnerDelay3]">
        </div>
    </div>
</template>
    
<script>
export default {

    props: {

        color: {
            type: String,
            default: '#000000'
        },
        size: {
            type: String,
            default: '25px'
        },
        margin: {
            type: String,
            default: '20px'
        },
        radius: {
            type: String,
            default: '100%'
        }
    },
    data() {
        return {
            spinnerStyle: {
                backgroundColor: this.color,
                width: this.size,
                height: this.size,
                margin: this.margin,
                borderRadius: this.radius,
                display: 'inline-block',
                animationName: 'v-pulseStretchDelay',
                animationDuration: '0.75s',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'cubic-bezier(.2,.68,.18,1.08)',
                animationFillMode: 'both'
            },
            spinnerDelay1: {
                animationDelay: '0.12s'
            },
            spinnerDelay2: {
                animationDelay: '0.24s'
            },
            spinnerDelay3: {
                animationDelay: '0.36s'
            }
        }
    }

}
</script>
    
<style>
.v-spinner {
    margin: 100px auto;
    text-align: center;
}

@keyframes v-pulseStretchDelay {

    0%,
    80% {
        transform: scale(1);
        opacity: 1;
    }

    45% {
        transform: scale(0.1);
        opacity: 0.7;
    }
}
</style>