interface Response {
  status: Boolean,
  message: String,
  status_code: number,
  data: any
}

const response: Response = {
  status: false,
  message: '',
  status_code: 0,
  data: []
}

export default response