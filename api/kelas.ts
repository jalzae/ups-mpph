export default {kelascreate(data:any){ 
        return {
          method:"POST",url:"Kelas/create",data}},
      kelasreadall(){ 
        return {
          method:"GET",url:"Kelas/readall"}},
      kelasdelete(id:any,){ 
        return {
          method:"DELETE",url:`Kelas/delete/${id}`}},
      
  }