import React, { useCallback, useEffect } from "react";
import { Box, IconButton, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import useStatics from "../../hooks/useStatetics";

const StatisticAdmin = () =>{
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


  const transactions =  statistics[14];
  const transactionAmount =  statistics[13];
  const totalTrans =  statistics[12];
  const totalCat =  statistics[11];
  const totalUserType =  statistics[10];
  const totalSub =  statistics[9];
  const totalVer =  statistics[8];
  const totalUser = statistics[7];
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
            title={totalUser?.status === "fulfilled" ? totalUser?.value : 0 }
            subtitle="Total Users"
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

        
        {
          totalUserType?.status==="fulfilled" ?
          totalUserType?.value.map((item)=>{
            return (
              <Box
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox
                  title={item?.total}
                  subtitle={ `Total ${item?._id?.userType} User`}
                  progress="0.80"
                  increase=""
                  icon={
                    <TrafficIcon
                      sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
                />
              </Box>
            )
          })
          : null
        }

         {
          totalSub?.status==="fulfilled" ?
          totalSub?.value.map((item)=>{
            return (
              <Box
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox
                  title={item?.total}
                  subtitle={item?._id?.subscriptionStatus ? "Subscribed" : "Not Subscribed"}
                  progress="0.80"
                  increase=""
                  icon={
                    <TrafficIcon
                      sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
                />
              </Box>
            )
          })
          : null
         }
         {
          
          totalVer?.status==="fulfilled" ?
          totalVer?.value.map((item)=>{
            return (
              <Box
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox
                  title={item?.total}
                  subtitle={item?._id?.isVerified ? "Verified Users" : "Not Verified Users"}
                  progress="0.80"
                  increase=""
                  icon={
                    <TrafficIcon
                      sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
                />
              </Box>
            )
          })
          : null
         }
       <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalNotFreeBook.status === "fulfilled" ? totalNotFreeBook.value : 0}
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
            title={totalFreeBook.status === "fulfilled" ? totalFreeBook.value : 0}
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
            title={totalVideoBook.status === "fulfilled" ? totalVideoBook.value : 0}
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
            title={totalPDFBook.status === "fulfilled" ? totalPDFBook.value : 0}
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
            title={totalApprovedBook.status === "fulfilled" ? totalApprovedBook.value : 0}
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
            title={totalNotApprovedBook.status === "fulfilled" ? totalNotApprovedBook.value : 0}
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
            title={totalBook.status === "fulfilled" ? totalBook.value : 0}
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
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Total Transaction
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                ₦{
                
                  transactionAmount?.status==="fulfilled" ?
                  transactionAmount?.value.reduce((acc,val)=>{  
                    return acc + val.amount
                  }, 0)
                  : 0
              
                }
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} data={transactionAmount} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {transactions?.status==="fulfilled" ?
           transactions.value.map((transaction, i) => (
            <Box
              key={`${transaction.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                   {transaction.id.substring(0, 8)}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction?.user?.firstName} {transaction?.user?.lastName}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ₦{transaction.amount}
              </Box>
            </Box>
          ))
          : null
        }
        </Box>
      </Box>
      </Box>


    </Box>
    </>
  )
}

export default StatisticAdmin