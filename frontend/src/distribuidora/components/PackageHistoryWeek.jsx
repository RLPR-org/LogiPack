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

const labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Encomendas processadas',
            data: [33, 25, 35, 51, 54, 0, 0],
            borderColor: '#890dff',
            backgroundColor: '#a74bff',
        }
    ],
};
  
function PackageHistoryWeek() {
    return (
        <Line data={data} options={{ maintainAspectRatio: false }} />
      );
}

export {PackageHistoryWeek};
