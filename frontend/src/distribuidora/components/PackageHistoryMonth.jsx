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


function PackageHistoryMonth(props) {
  const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  const data = {
    labels,
    datasets: [
        {
        label: 'Encomendas processadas neste mês',
        data: props.data,
        borderColor: '#299227',
        backgroundColor: '#4f994d',
        }
    ],
  };

  return (
    <Line data={data} options={{ maintainAspectRatio: false }} />
  );
}

export {PackageHistoryMonth};
