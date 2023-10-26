export default {
  homeindex() {
    return {
      method: "GET", url: "Home/index"
    }
  },
  homereadalltugas() {
    return {
      method: "GET", url: "Home/readall_tugas"
    }
  },
  homereadonetugas(id: any,) {
    return {
      method: "GET", url: `Home/readone_tugas/${id}`
    }
  },
  homechecktugas(data: any) {
    return {
      method: "POST", url: "Home/check_tugas", data
    }
  },
  homedeletetugas(data: any) {
    return {
      method: "POST", url: "Home/delete_tugas", data
    }
  },

}