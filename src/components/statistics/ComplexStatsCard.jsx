import React from 'react';

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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components

import { Typography, Box} from '@mui/material';


function ComplexStatisticsCard({ color, title, count, percentage, icon }) {
  return (
    <Card>
      <Box
        sx={{
          display:"flex",
          justifyContent:'space-between',
          paddingTop:'1',
          padding:'auto 2'
        }}
       >
        <Box
          sx={{
            backgroundColor: color,
            color:`${color === "light" ? "dark" : "white"}`,
            borderRadius:"2px",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            width:"4rem",
            height:"4rem",
            marginTop:-3
          }}

        >
          <Icon fontSize="medium" color="inherit" >
            {icon}
          </Icon>
        </Box>
        <Box 
          sx={{
            textAlign:"right",
            lineHeight:1.25
          }}
        >
          <Typography variant="button" fontWeight="light" color="text">
            {title}
          </Typography>
          <Typography variant="h4">{count}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{
        paddingBottom:2,
        padding:'inherit 2'
      }}>
        <Typography component="p" variant="button" color="text" display="flex">
          <Typography
            component="span"
            variant="button"
            fontWeight="bold"
            color={percentage.color}
          >
            {percentage.amount}
          </Typography>
          &nbsp;{percentage.label}
        </Typography>
      </Box>
    </Card>
  );
}

// Setting default values for the props of ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

// Typechecking props for the ComplexStatisticsCard
ComplexStatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
};

export default ComplexStatisticsCard;