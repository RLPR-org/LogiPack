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

const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export const data = {
labels,
datasets: [
    {
    label: 'Encomendas processadas',
    data: [33, 25, 35, 51, 54, 0, 0, 33, 25, 35, 51, 54],
    borderColor: '#af0000',
    backgroundColor: '#d25252',
    }
],
};
  
function PackageHistoryYear() {
  return (
    <Line data={data} options={{ maintainAspectRatio: false }} />
  );
}

export {PackageHistoryYear};
