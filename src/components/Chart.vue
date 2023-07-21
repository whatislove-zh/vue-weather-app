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
        chartId:{
            type:String,
            default:"myChart"
        }
    },
    data() {
        return {
            map: new Map()
        }
    },
    computed: {
        tempValues() {
            let temp = [];
            const values = this.map.values();
            for (let i = 0; i < this.map.size; i++) {
                temp.push(values.next().value)
            }
            return temp;
        },
    },
    methods: {
        calculateNext5Days() {
            this.map = new Map();
            for (let val of this.data) {
                if (this.map.size == 5) {
                    break;
                }

                let data = new Date(val.dt * 1000).toLocaleDateString(undefined, { month: "numeric", day: "numeric" });

                if (!this.map.has(data)) {
                    this.map.set(data, val.main.temp)
                } else {
                    if (this.map.get(data) < val.main.temp) {
                        this.map.set(data, val.main.temp)
                    }
                }
            }
        },
        timeFormat(dt_txt) {
            const time = new Date(dt_txt)
            return `${time.getHours()}:${time.getMinutes()}0`
        },
        chartValues(keys, values) {
            const result = {
                labels:[],
                dataSet:[]
            };
            for (let i=0;i<=this.map.size;i++) {
                result.labels.push(keys.next().value)
                result.dataSet.push(Math.trunc(values.next().value))
            }
            return result
        }
    },
    mounted() {
        if (this.duration === "day") {
            for (let val of this.data) {
                const data = this.timeFormat(val.dt_txt)
                this.map.set(data, val.main.temp)
            }
        } else {
            this.calculateNext5Days();
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

        // console.log(myChart)
        // console.log(this.map)
    }
}
</script>
