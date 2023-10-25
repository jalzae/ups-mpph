import Swal from 'sweetalert2'
export default {
  success(title: string = 'Berhasil!', text: string) {
    Swal.fire({ title, text, icon: 'success' })
  },
  fail(title: string = 'Berhasil!', text: string) {
    Swal.fire({ title, text, icon: 'error' })
  },
  warning(title: string = 'Berhasil!', text: string) {
    Swal.fire({ title, text, icon: 'warning' })
  },
}