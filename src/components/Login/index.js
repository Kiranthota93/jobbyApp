import Cookies from 'js-cookie'
import {useState} from 'react'

const Login = props => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    showErrorMsg: false,
    errorMessage: '',
  })

  const failureFetch = errorMsg => {
    setFormData({
      ...formData,
      showErrorMsg: !formData.showErrorMsg,
      errorMessage: errorMsg,
    })
  }

  const checkUserData = async () => {
    const {username, password} = formData
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }

    const response = await fetch(url, options)
    const responseData = await response.json()
    const jwtToken = responseData.jwt_token
    if (response.ok === true) {
      const {history} = props
      Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
      history.replace('/')
    } else {
      failureFetch(responseData.error_msg)
    }
  }

  const submitData = event => {
    event.preventDefault()
    checkUserData()
  }

  const handleInputChange = event => {
    const {name, value} = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <form onSubmit={submitData}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <input type="submit" />
      {formData.showErrorMsg && <p>{formData.errorMessage}</p>}
    </form>
  )
}

export default Login
