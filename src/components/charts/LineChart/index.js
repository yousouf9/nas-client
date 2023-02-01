/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";


import { Box, Typography } from "@mui/material";

// ReportsLineChart configurations
import configs from "./config";

function ReportsLineChart({ color, title, description, date, chart }) {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

  return (
    <Card sx={{ height: "100%" }}>
      <Box style={{padding:"1rem"}}>
        {useMemo(
          () => (
            <Box
              style={{
                backgroundColor:color,
                paddingTop: "16px",
                paddingRight: "16px",
                marginTop: "-20px",
                height:"12.5rem",
                borderRadius:'32px',
                border: `2px solid ${color}`

              }}
            >
              <Line data={data} options={options} />
            </Box>
          ),
          [chart, color]
        )}
        <Box 

            style={{
              padding:'20px 18px 16px'
            }}
        
        
        >
          <Typography variant="h6" textTransform="capitalize">
            {title}
          </Typography>
          <Typography component="div" variant="button" color="text" fontWeight="light">
            {description}
          </Typography>
          <Divider />
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
           >
            <Typography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
              <Icon>schedule</Icon>
            </Typography>
            <Typography variant="button" color="text" fontWeight="light">
              {date}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

// Setting default values for the props of ReportsLineChart
ReportsLineChart.defaultProps = {
  color: "dark",
  description: "",
};

// Typechecking props for the ReportsLineChart
ReportsLineChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.string.isRequired,
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default ReportsLineChart;
