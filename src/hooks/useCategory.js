import create from 'zustand';
import request from '../api/build-request';

const userCategory = create((set) => ({
  categories: [],

  fetchALL: async () => {
    try {
    const res = await request().get('/categories')

    console.log(res, "res");
      set(state=>({categories:[...res.data]}));
    } catch (error) {
       throw new Error(error.response?.data)
    }  
   },

  addCategory: (data) => {
     set(state=>({categories:[...state.categories, data]}));
  },
  editCategory: (data) => {

    set(state=>({categories:state.categories.map(cat=>{
        if(cat.id===data.id){
          return {...cat, title: data.title}
        }
        return cat
    })}));
  },
  deleteCategory: (data) => {
    set(state=>({categories:state.categories.filter(cat=>{
      return cat.id!==data.id
    })}));
  }

}));

export default userCategory;