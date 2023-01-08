import React, {useState, useEffect, useCallback} from "react";
import Pagination from "@mui/material/Pagination";
import CardWrapper from "./CardWrapper";
import { Divider } from "@mui/material";
import useLoader from "../../hooks/useLoader";
import request from "../../api/build-request";


export default function ListPremiumBookItem() {
 
  const [books, setBooks] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [Loader, showLoader, HideLoader]  = useLoader()

  

  const  callback = useCallback( async()=>{
    showLoader()
    try {

      const res = await request().get(`/books?limit=${pageSize}&page=${page}&free=${false}`);

      console.log(res, "data gotten");

      setBooks(res.data.data.docs)
      setTotalCount(res.data.data.totalPages)

      } catch (error) {
         console.log(error.response?.data)
      }
      finally{
        HideLoader()
      }

  }, [pageSize, page])

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
