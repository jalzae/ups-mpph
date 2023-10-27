export default {tugascreate(data:any){ 
        return {
          method:"POST",url:"Tugas/create",data}},
      tugasreadall(){ 
        return {
          method:"GET",url:"Tugas/readall"}},
      tugasupdate(id:any,data:any){ 
        return {
          method:"PUT",url:`Tugas/update/${id}`,data}},
      tugasdelete(id:any,){ 
        return {
          method:"DELETE",url:`Tugas/delete/${id}`}},
      
  }