import '../../App.css';
import React from "react";
import Grid from '@mui/material/Grid';

import { PackageHistoryWeek } from './PackageHistoryWeek';
import { PackageHistoryMonth } from './PackageHistoryMonth';
import { PackageHistoryYear } from './PackageHistoryYear';
  
function PackageHistory() {
  return (
    <>
        <div className='history-chart-div'>

            <Grid container spacing={10}>

                <Grid item xs={6} display="flex" justifyContent="center" alignItems="center"  style={{height: "300px"}}>
                    <PackageHistoryWeek></PackageHistoryWeek>
                </Grid>

                <Grid item xs={6} display="flex" justifyContent="center" alignItems="center"  style={{height: "300px"}}>
                    <PackageHistoryMonth></PackageHistoryMonth>
                </Grid>

            </Grid>
        </div>

        <div className='history-chart-div' style={{"height": "500px"}}>
            <PackageHistoryYear></PackageHistoryYear>
        </div>
    </>
  );
}

export {PackageHistory};
