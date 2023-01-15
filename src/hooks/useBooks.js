import create from 'zustand';
import request from '../api/build-request';

const useBooks = create((set) => ({
  books: [],
  total:0,
  totalPages:0,
  fetchBooks: async ({limit, page, search,category,free, myown}) => {
    try {

    const res = await request().get(`/books?limit=${limit}&page=${page}&search=${search}&category=${category}&free=${free}&${ myown ? 'myown='+myown : undefined}`);
    console.log(res, "res", free);
      set(state=>({
        books:[...res.data.data.docs],
        total:res.data.data.totalDocs,
        totalPages:res.data.data.totalPages
      }));
    } catch (error) {
       throw error
    }  
   },
  addBook: (data) => {
     set(state=>({books:[...state.books, data]}));
  },
  editBook: (data) => {

    set(state=>({books:state.books.map(cat=>{
        if(cat.id===data.id){
          return {...cat, title: data.title}
        }
        return cat
    })}));
  },
  deleteBook: (data) => {
    set(state=>({books:state.books.filter(book=>{
      return book._id!==data.id
    })}));
  }

}));

export default useBooks;