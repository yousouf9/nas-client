import React, { useState } from "react";
import {useLocation} from 'react-router-dom';
import { Document, Page, pdfjs } from "react-pdf";
import { useCookies } from 'react-cookie';
import "./pdfviewer.css";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import useNotification from "../../hooks/useNotification";
import useUser from "../../hooks/useAuth";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfViewer = () => {

  const [cookies, setCookie] =  useCookies(['curren-page']);

  const user = useUser(state=>state.user);

  const location = useLocation();
  const {content, title, author, type} = location.state;


console.log( "form views", user);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(parseInt(cookies[`${title}`]) || 1);
  const [currPage, setCurrPage] = useState(0);
  const [warningNotification, successNotification, infoNotification] = useNotification()

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    
  };

  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleChange =(e)=>{
    e.preventDefault()
    setCurrPage(parseInt(e.target.value));  
  }

const handSavePage = (e)=>{

   e.preventDefault()
  const value =  currPage;
    if(isNaN(value)){
      infoNotification("Please insert a valid number", "Invalid number")
    }else{
      if(value > numPages){
        infoNotification("Exceed total pdf pages", "Invalid number")
        setPageNumber(numPages);
        setCurrPage(numPages);
      }else if(value < 1){
        infoNotification("Below total pdf pages", "Invalid number")
        setPageNumber(1);
        setCurrPage(1);
      }else{
        setPageNumber(value);
      }
      setCurrPage(value);
    } 
  }
  return (
    <>
      <Box sx={{ display: 'flex',justifyContent: 'flex-end', margin:"15px"}} >
        <Box>
            <TextField
              sx={{marginBottom:"5px", marginRight:"5px"}}
              hiddenLabel
              id="standard"
              label="Goto-Page"
              variant="standard"
              size="small"
              value={currPage}
              type={'number'}
              color='success'
              onChange={handleChange}
            />
            <Button size='medium' variant='contained' color="success" onClick={handSavePage}>
              Goto Page
            </Button>
        </Box>  
      </Box>
      <Divider/>
      <Box className="">
        <Box className="content">
            <Typography gutterBottom variant="h4" component="div" color='text.secondary'>
                {title}
            </Typography>
          
            <Box > 
              <Box className="controls">
                <Button variant='text' color="warning" onClick={prevPage} disabled={pageNumber === 1}>
                  Prev
                </Button>
                <Button variant='text' color="success" onClick={nextPage} disabled={pageNumber === numPages}>
                  Next
                </Button>
              </Box>
            <Box>
              <Typography gutterBottom variant="h6" component="div" color='green'>
                  Page {pageNumber} of {numPages}
              </Typography>
            </Box>
        </Box>
        </Box>
        <Document
          file={content}
          onLoadSuccess={onDocumentLoadSuccess}
          onContextMenu={(e) => e.preventDefault()}
          className="pdf-container"
          
        >
          <Page pageNumber={pageNumber} scale={'1.5'} />
        </Document>
        <Box className="content">
          <Box className="controls">
            <Button variant='text' color="warning" onClick={prevPage} disabled={pageNumber === 1}>
              Prev
            </Button>
            <Button variant='text' color="success" onClick={nextPage} disabled={pageNumber === numPages}>
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PdfViewer;