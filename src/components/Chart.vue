<template>
    <div class="chart">
        <canvas :id="chartId"></canvas>
    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
    props: {
        data: {
            type: Array,
        },
        duration: {
            type: String,
            default: 'day'
        },
        chartId: {
            type: String,
            default: "myChart"
        }
    },
    data() {
        return {
            map: new Map()
        }
    },
    methods: {
        timeFormat(dt_txt) {
            const time = new Date(dt_txt)
            return `${time.getHours()}:${time.getMinutes()}0`
        },
        chartValues(keys, values) {
            const result = {
                labels: [],
                dataSet: []
            };
            for (let i = 0; i <= this.map.size; i++) {
                result.labels.push(keys.next().value)
                result.dataSet.push(Math.trunc(values.next().value))
            }
            return result
        }
    },
    mounted() {
        for (let val of this.data) {
            const data = this.timeFormat(val.dt_txt)
            this.map.set(data, val.main.temp)
        }
        const keys = this.map.keys();
        const values = this.map.values();
        const chartData = this.chartValues(keys, values)

        Chart.defaults.color = '#ffffff'
        const ctx = document.getElementById(this.chartId);
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    data: chartData.dataSet,
                    backgroundColor: '#1266F1',
                    borderColor: 'black',
                    color: 'black',
                    borderWidth: 3,
                    tension: 0.5,
                }]
            },
            options: {
                plugins: {
                    legend: false,
                    title: {
                        display: true,
                        text: 'Graph of average temperature'
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Temp'
                        },
                    },
                    x: {
                        grid: {
                            display: true,
                        }
                    }
                }
            }
        });
    }
}
</script>
