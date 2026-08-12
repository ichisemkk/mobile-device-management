import { useState } from 'react'

function App() {
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          loginId: loginId,
          password: password,
        }),
      })

      if (response.ok) {
        const data = await response.json()

        setMessage(data.message)

        console.log('ログイン成功')
        console.log(data)
      } else {
        setMessage('ログインIDまたはパスワードが正しくありません')
      }

    } catch (error) {
      console.error(error)
      setMessage('通信エラーが発生しました')
    }
  }

  return (
    <>
      <h1>移動機管理アプリ</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>ログインID</label>
          <input
            type="text"
            value={loginId}
            onChange={(event) => setLoginId(event.target.value)}
          />
        </div>

        <div>
          <label>パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit">
          ログイン
        </button>
      </form>

      <p>{message}</p>
    </>
  )
}

export default App