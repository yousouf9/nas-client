import  React, {Stylesheet} from 'react';
import { Box, Grid, Typography } from '@mui/material';




const style = {
  logo:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  welcome:{
    display:"flex",
    justifyContent:'flex-start',
    alignItems:'flex-start',
    flexDirection:'column',
    padding:"10px"
  }
}

const HomeIntroduction = () =>{
 return (
  <Grid container rowSpacing={{xs:4}} columnSpacing={{ xs: 1, sm: 2, md: 3}} sx={{mt:5, p:4}}>
      <Grid item  xs={12} md={6} sx={style.welcome}>
            <Typography variant="h2" component="h2"
              color={'green'}
             >
                Welcome to Nasarawa State E-Library
            </Typography>
            <Typography variant="p" component="p" >
                  Read From the Thousands of E-books Made Available Here!
            </Typography>
      </Grid>
      <Grid item xs={12} md={6} sx={style.logo}>
            <div style={{
            backgroundImage:'url(/asset/backgound/shelf.png)',
            backgroundPosition:'center',
            backgroundRepeat:'no-repeat',
            backgroundSize:'contain',
            minHeight:'300px',
            width:'100%',
            }}>
            </div>
      </Grid>
  </Grid>
 )
}

export default HomeIntroduction;