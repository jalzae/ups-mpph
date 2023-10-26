export default {mahasiswacreate(data:any){ 
        return {
          method:"POST",url:"Mahasiswa/create",data}},
      mahasiswareadall(){ 
        return {
          method:"GET",url:"Mahasiswa/readall"}},
      mahasiswadelete(id:any,){ 
        return {
          method:"DELETE",url:`Mahasiswa/delete/${id}`}},
      
  }