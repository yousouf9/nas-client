import create from 'zustand';
import request from '../api/build-request';

const useStatics = create((set) => ({
  statistics: [],
  total: 0,
  fetchStatistics: async () => {
    try {

      const res = await request().get(`/statistics`)
      set(state => ({statistics:[...res.data.data]}));

    } catch (error) {
       throw new Error(error.response?.data)
    }  
   }

}));

export default useStatics;