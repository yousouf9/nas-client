import React from "react";
import {useLocation} from 'react-router-dom';
import "./videoViewer.css";

import ReactPlayer from "react-player"


const Player = () =>{


  const location = useLocation();
  const {content, title, author, type} = location.state;

    return (
      <>
        <div className='player-wrapper'>
          <ReactPlayer
            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
            onContextMenu={e => e.preventDefault()}
            controls
            className='react-player'
            url={content}
            width='100%'
            height='100vh'
          />
      </div>
      </>
    )
  
}

export default Player;