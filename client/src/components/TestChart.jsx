import { Doughnut, Pie } from 'react-chartjs-2';
import React, {useState, useEffect} from 'react';
import {Chart as ChartJS, ArcElement,  Tooltip, Legend, Title} from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const TestChart =  () => {

    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartInstance) {
            chartInstance.destroy(); // Destroy the existing chart instance
        }
    }, []);


    const data = {
        labels: ['Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday'],
        datasets: [
            {
                label: 'Numbers',
                backgroundColor: [
                    '#B21F00',
                    '#C9DE00',
                    '#2FDE00',
                    '#00A6B4',
                    '#6800B4'
                ],
                hoverBackgroundColor: [
                    '#501800',
                    '#4B5000',
                    '#175000',
                    '#003350',
                    '#35014F'
                ],
                data: [65, 59, 80, 81, 56],
                 
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
            legend: {
                display: false,
                position: 'left',
            },
            title: {
                display: true,
                text: 'Average Of Something',
                fontSize: 25,
                align: 'center',
                position: 'bottom',
                padding: {
                    top: 10,
                    
                }
            },
        }
     };

    return (
            <>
            <div className="relative mx-auto w-full" >
                <Pie
                    data={data}
                    options={options}
                    onElementsClick={elems => {
                        if (elems && elems.length > 0) {
                            // Handle click event
                        }
                    }}
                    redraw={false}
                    // Ref callback to store the Chart.js instance
                    ref={chartInstance => {
                        setChartInstance(chartInstance);
                    }}
                />
        </div>
        </>
    
    )
}

export default TestChart