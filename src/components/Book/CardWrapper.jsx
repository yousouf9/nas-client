import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import BookCard from './Card';


export default function CardWrapper({data}) {
  return (
    <Box sx={{marginLeft:'5px', marginRight:'5px', marginTop:"20px",  marginBottom: "15px"}}>
      <Grid container spacing={{ xs: 1, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data?.length? data.map((item) => (
          <Grid item xs={6} sm={4} md={3} key={item._id}>
              <BookCard 
                image={item.image}
                free={item.free}
                author={item.author}
                title={item.title}
                category={item.category}
                description={item.description}
                type={item.type}
                content={item.content}
              />
          </Grid>
        )): <Typography sx={{margin:"30px"}} textAlign={'center'}>Empty content</Typography>}
      </Grid>
    </Box>
  );
}
