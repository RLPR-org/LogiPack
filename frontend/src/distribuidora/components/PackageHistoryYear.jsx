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

function getCharData(dataYear) {

  let m = "";
  const data = [];
  for (let i=1; i<=12; i++) {
    m += i<10 ? "0"+i : i;
    data.push(dataYear[m]);
    m = "";
  }

  return data;
}


function PackageHistoryYear(props) {
  
  const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  
  const data = {
    labels,
    datasets: [
        {
        label: 'Encomendas processadas neste ano',
        data: getCharData(props.data),
        borderColor: '#af0000',
        backgroundColor: '#d25252',
        }
    ]
  }

  return (
    <Line data={data} options={{ maintainAspectRatio: false }} />
  );
}

export {PackageHistoryYear};
