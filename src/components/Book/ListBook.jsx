import React, {useState, useEffect, useCallback} from "react";
import Pagination from "@mui/material/Pagination";
import CardWrapper from "./CardWrapper";
import { Divider } from "@mui/material";
import useLoader from "../../hooks/useLoader";
import useBooks from "../../hooks/useBooks";


export default function ListBookItem() {
 

  const books = useBooks(state=> state.books);
  const totalCount = useBooks(state=> state.totalPages);
  const fetchBooks  = useBooks(state => state.fetchBooks);

  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [Loader, showLoader, HideLoader]  = useLoader()
  

  const  callback = useCallback( async()=>{
    showLoader()
    fetchBooks({limit:pageSize, page, free:true})
    HideLoader()
  }, [fetchBooks, pageSize, page])

  useEffect(()=>{
  try {
    
    callback()

  } catch (error) {

    console.log(error);
  }
  }, [callback])


  const handleChange = (event, value) => {
    setPage(value)
  };


  return (
    <>
      {Loader}
      <CardWrapper data={books} />
      <Divider />
      <div style={{ display: "flex", justifyContent: "center", marginTop:"5px" }}>
        <Pagination
          count={totalCount}
          page={page}
          onChange={handleChange}
          color="success"
        />
      </div>
    </>
  );
}
