export default {tugascreate(data:any){ 
        return {
          method:"POST",url:"Tugas/create",data}},
      tugasreadall(){ 
        return {
          method:"GET",url:"Tugas/readall"}},
      tugasdelete(id:any,){ 
        return {
          method:"DELETE",url:`Tugas/delete/${id}`}},
      
  }