import React, { useCallback, useEffect } from "react";
import { Box, IconButton, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import useStatics from "../../hooks/useStatetics";

const StatisticUser = () =>{
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const fetchStatistics = useStatics(state => state.fetchStatistics)
  const statistics = useStatics(state => state.statistics);

  const  callback = useCallback( async()=>{
      
    fetchStatistics()
 
  }, [fetchStatistics])

  useEffect(()=>{
  try {
    callback()
    
  } catch (error) {
  }
  }, [callback])

 
  const totalTrans = statistics[0];
  const lastTrans = statistics[1];
  const detail = statistics[0]?.value[0];
 
  console.log(lastTrans, totalTrans);

  return(
    <>
     <Box>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header/>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={lastTrans?.status === "fulfilled" ? detail?.amount : 0 }
            subtitle="Last Transactions"
            progress="0.80"
            increase=""
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalTrans?.status === "fulfilled" ? totalTrans?.value : 0 }
            subtitle="Total Transactions"
            progress="0.80"
            increase=""
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
      </Box>


    </Box>
    </>
  )
}

export default StatisticUser