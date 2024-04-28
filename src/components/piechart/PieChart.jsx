import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'

const PieChart = (props) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    useEffect(()=>{
        if(chartInstance.current){
            chartInstance.current.destroy();
        }
        const myChartRef = chartRef.current.getContext('2d');

        chartInstance.current = new Chart(myChartRef, {
            type:"pie",
            data:{
                labels:props.labels,
                datasets:[
                    {
                        data: props.data,
                        backgroundColor:['rgb(255,99,132)','rgb(54,162,235)','rgb(255,205,86)']
                    }
                ]
            }
        })
        return ()=> {
            if(chartInstance.current){
                chartInstance.current.destroy();
            }
        }
    },[])

  return (
    <div style={{width: "85%", overflow:"hidden"}}>
        <canvas ref={chartRef} />
    </div>
  )
}

export default PieChart;