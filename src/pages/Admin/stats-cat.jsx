import React, { useCallback, useEffect } from "react";
import { Box, IconButton, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import useStatics from "../../hooks/useStatetics";

const StatisticCat = () =>{
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


  const totalCat =  statistics[11];


  console.log(statistics, "Statics", );
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
            title={totalCat?.status === "fulfilled" ? totalCat?.value : 0 }
            subtitle="Total Categories"
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

export default StatisticCat