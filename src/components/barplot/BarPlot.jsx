import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'

const BarPlot = (props) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    useEffect(()=>{
        if(chartInstance.current){
            chartInstance.current.destroy();
        }
        const myChartRef = chartRef.current.getContext('2d');
        const labels = props.labels;
        chartInstance.current = new Chart(myChartRef, {
            type:"bar",
            data: {
              labels: labels,
              datasets: [{
                label: props.label,
                data: props.data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(89, 59, 254, 0.8)',
                  'rgba(255, 205, 86, 0.8)',
                  'rgba(75, 192, 192, 0.8)',
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(89, 59, 254, 0.8)',
                  'rgba(255, 205, 86, 0.8)',
                  'rgba(75, 192, 192, 0.8)',
                ],
                borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(89, 59, 254)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(255, 99, 132)',
                  'rgb(89, 59, 254)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                ],
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false, // Allows dynamic resizing
              scales: {
                x: { ticks: { autoSkip: false, maxRotation: 45, minRotation: 0 } },
                y: { beginAtZero: true }
            }
          }      
        })
        return ()=> {
            if(chartInstance.current){
                chartInstance.current.destroy();
            }
        }
    },[])

  return (
    // <div style={{width: "85%", overflow:"hidden"}}>
    //     <canvas ref={chartRef} />
    // </div>

    <div style={{ width: "100%", maxWidth: "85%", overflow: "hidden", margin: "auto",height:"250px"}}>
    <canvas ref={chartRef} style={{ maxWidth: "100%", height: "auto" }} />
</div>
  )
}

export default BarPlot;