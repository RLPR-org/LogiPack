import '../../App.css';
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function getLabels(data) {
    const labels = [];
    for (let l=0; l<Object.keys(data).length; l++) {
        let lStr = Object.keys(data)[l];

        if (lStr.startsWith("...")) 
            labels.push("...");
        else
            labels.push(Object.keys(data)[l]);
    }
    
    return labels;
}


function PackageHistoryWeek(props) {
    const labels = getLabels(props.data);
    const data = {
        labels,
        datasets: [
            {
                label: 'Encomendas processadas nesta semana',
                data: Object.values(props.data),
                borderColor: '#890dff',
                backgroundColor: '#a74bff',
            }
        ],
    }

    return (
        <Line data={data} options={{ maintainAspectRatio: false }} />
      );
}

export {PackageHistoryWeek};
