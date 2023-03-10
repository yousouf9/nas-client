import create from 'zustand';
import request from '../api/build-request';

const useContact = create((set) => ({
  contacts: [],
  contact: undefined,

  fetchContacts: async () => {
    try {
    const res = await request().get('/contacts')

      set(state=>({contacts:[...res.data.data]}));
    } catch (error) {
       throw new Error(error.response?.data)
    }  
   },
   fetchContact: async (id) => {
    try {
    const res = await request().get(`/contacts/${id}`)

      set(state=>({contact:res.data.data}));
    } catch (error) {
       throw new Error(error.response?.data)
    }  
   },
  addContact: (data) => {
     set(state=>({contacts:[...state.contacts, data]}));
  },
  editContact: (data) => {

    set(state=>({contacts:state.contacts.map(contact=>{
        if(contact.id===data.id){
          return {...contact, ...data}
        }
        return contact
    })}));
  },
  deleteContact: (data) => {
    set(state=>({contacts:state.contacts.filter(contact=>{
      return contact.id!==data.id
    })}));
  },
}));

export default useContact;