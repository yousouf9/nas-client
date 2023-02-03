import create from 'zustand';
import request from '../api/build-request';

const usePage = create((set) => ({
  contacts: [],

  fetchContacts: async () => {
    try {
    const res = await request().get('/contacts')

      set(state=>({contacts:[...res.data]}));
    } catch (error) {
       throw new Error(error.response?.data)
    }  
   },
  addPage: (data) => {
     set(state=>({contacts:[...state.contacts, data]}));
  },
  editContact: (data) => {

    set(state=>({contacts:state.contacts.map(page=>{
        if(page.id===data.id){
          return {...page, title: data.title, description: data.description}
        }
        return page
    })}));
  },
  deletePage: (data) => {
    set(state=>({contacts:state.contacts.filter(page=>{
      return page.id!==data.id
    })}));
  }

}));

export default usePage;