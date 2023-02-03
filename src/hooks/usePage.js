import create from 'zustand';
import request from '../api/build-request';

const usePage = create((set) => ({
  pages: [],
  total: 0,
  fetchPages: async (page) => {
    try {

       console.log(page);
      const res = await request().get(`/pages${page ? "?page="+page : undefined}`)
      set(state => ({pages:[...res.data.data]}));

    } catch (error) {
       throw new Error(error.response?.data)
    }  
   },
  addPage: (data) => {
     set(state=>({pages:[...state.pages, data]}));
  },
  editPage: (data) => {

    set(state=>({pages:state.pages.map(page=>{
        if(page.id===data.id){
          return {...page, title: data.title, description: data.description}
        }
        return page
    })}));
  },
  deletePage: (data) => {
    set(state=>({pages:state.pages.filter(page=>{
      return page.id!==data.id
    })}));
  }

}));

export default usePage;