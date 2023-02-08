import React, { useCallback, useEffect } from "react";
import { Box, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import useStatics from "../../hooks/useStatetics";

const StatisticLecturer = () =>{
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

  const totalNotFreeBook = statistics[6];
  const totalFreeBook = statistics[5];
  const totalVideoBook = statistics[4];
  const totalPDFBook = statistics[3];
  const totalApprovedBook = statistics[2];
  const totalNotApprovedBook = statistics[1];
  const totalBook = statistics[0];
 

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
            title={totalNotFreeBook?.status === "fulfilled" ? totalNotFreeBook?.value : 0}
            subtitle={"Total Paid Books"}
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
            title={totalFreeBook?.status === "fulfilled" ? totalFreeBook?.value : 0}
            subtitle={"Total Free Books"}
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
            title={totalVideoBook?.status === "fulfilled" ? totalVideoBook?.value : 0}
            subtitle={"Total Video Books"}
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
            title={totalPDFBook?.status === "fulfilled" ? totalPDFBook?.value : 0}
            subtitle={"Total PDF Books"}
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
            title={totalApprovedBook?.status === "fulfilled" ? totalApprovedBook?.value : 0}
            subtitle={"Total Approved Books"}
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
            title={totalNotApprovedBook?.status === "fulfilled" ? totalNotApprovedBook?.value : 0}
            subtitle={"Total Pending Books"}
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
            title={totalBook?.status === "fulfilled" ? totalBook?.value : 0}
            subtitle={"Total Books"}
            progress="0.80"
            increase=""
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
      </Box>
        {/* ROW 2 */}

      </Box>
      </Box>


    </Box>
    </>
  )
}

export default  StatisticLecturer
