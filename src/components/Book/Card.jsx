import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useUser from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';
import { Chip } from '@mui/material';

export default function BookCard({image, free, author, type, title, category, description, content}) {
  
  const navigate = useNavigate();
  const user = useUser(state => state.user);
  const [warningNotification, successNotification, infoNotification] = useNotification()

  const handleClick = (data, e)=>{
    e.preventDefault();


    if(user?.userType === 'admin'){

      if(data.type === "video"){
        navigate("/book/video", {state:{...data}})
      }else{
        navigate("/book/pdf", {state:{...data}})
      }
      return
    }
    else if(user?.subscribed===false && free === false){
      infoNotification("This is not a free book, you need to subscribe to read it", "Not a free book")
        return
    }else if(user?.subscribed===true){
     
      if(data.type === "video"){
        navigate("/book/video", {state:{...data}})
      }else{
        navigate("/book/pdf", {state:{...data}})
      }
 
      return
    }else if(free === true){

      if(data.type === "video"){
        navigate("/book/video", {state:{...data}})
      }else{
        navigate("/book/pdf", {state:{...data}})
      }
 
      return
    }
    else{

      infoNotification("This is not a free book, you need to subscribe to read it", "Not a free book")
      return
      }


  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={image ? image : "/asset/background/book.png"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color='green'>
          {title ? title : "Title"}
        </Typography>
        <Typography gutterBottom variant="subtitle2" component="div" color="text.secondary">
           Author: {author ? author : "Unknown"}
        </Typography>
        <Typography gutterBottom variant="subtitle2" component="div" color="text.secondary">
           Category: {category ? category : "Unknown"}
        </Typography>
          {type === "pdf" ?<Chip label="pdf" color="warning" /> :<Chip label="video" color='primary' />}
        <Typography variant="body2" color="text.secondary">
          {description ? description : "description not available now"}
        </Typography>
      </CardContent>
      <CardActions>

        {type === 'pdf'?
          <Button
          color='warning'
          variant='contained' 
          size="small"
          onClick={(e) => handleClick({content, title, author, type}, e)}
          >
            Read Book
          </Button> :
          <Button
            color='primary'
            variant='contained' 
            size="small"
            onClick={(e) => handleClick({content, title, author, type}, e)}
            >
              Watch Video
          </Button>
        }

      </CardActions>
    </Card>
  );
}