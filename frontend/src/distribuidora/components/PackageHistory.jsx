import '../../App.css';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import axios from '../../CustomAxios';
import CircularProgress from '@mui/material/CircularProgress';

import { PackageHistoryWeek } from './PackageHistoryWeek';
import { PackageHistoryMonth } from './PackageHistoryMonth';
import { PackageHistoryYear } from './PackageHistoryYear';

function PackageHistory() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [weekInfo, setWeekInfo] = useState({})
    const [monthInfo, setMonthInfo] = useState({})
    const [yearInfo, setYearInfo] = useState({})


    function fetchData() {
        const weekURL = "http://" + process.env.REACT_APP_API_HOST + ":8080/encomendas/historico/semana";
        const monthURL = "http://" + process.env.REACT_APP_API_HOST + ":8080/encomendas/historico/mes";
        const yearURL = "http://" + process.env.REACT_APP_API_HOST + ":8080/encomendas/historico/ano";

        const getWeekInfo = axios.get(weekURL);
        const getMonthInfo = axios.get(monthURL);
        const getYearInfo = axios.get(yearURL);

        axios.all([getWeekInfo, getMonthInfo, getYearInfo]).then(
            axios.spread(
                (...allData) => {
                    setWeekInfo(allData[0].data);
                    setMonthInfo(allData[1].data);
                    setYearInfo(allData[2].data);
                    setIsLoaded(true);
                }
            )
        )
    }


    useEffect(() => {
        fetchData();
    }, []);

    if (!isLoaded) {
        return (
            <>
                <div className='history-chart-div'>
        
                    <Grid container spacing={10}>
        
                        <Grid item xs={6} display="flex" justifyContent="center" alignItems="center"  style={{height: "300px"}}>
                            <CircularProgress />
                        </Grid>
        
                        <Grid item xs={6} display="flex" justifyContent="center" alignItems="center"  style={{height: "300px"}}>
                            <CircularProgress />
                        </Grid>
        
                    </Grid>
                </div>
        
                <div className='history-chart-div' style={{"height": "500px"}}>
                    <CircularProgress />
                </div>
            </>
        );
    }
    
    return (
        <>
            <div className='history-chart-div'>

                <Grid container spacing={10}>

                    <Grid item xs={6} display="flex" justifyContent="center" alignItems="center"  style={{height: "300px"}}>
                        <PackageHistoryWeek data={weekInfo}></PackageHistoryWeek>
                    </Grid>

                    <Grid item xs={6} display="flex" justifyContent="center" alignItems="center"  style={{height: "300px"}}>
                        <PackageHistoryMonth data={monthInfo}></PackageHistoryMonth>
                    </Grid>

                </Grid>
            </div>

            <div className='history-chart-div' style={{"height": "500px"}}>
                <PackageHistoryYear data={yearInfo}></PackageHistoryYear>
            </div>
        </>
    );
}

export {PackageHistory};
