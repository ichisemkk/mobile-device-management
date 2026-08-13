function Login({
  loginId,
  password,
  message,
  setLoginId,
  setPassword,
  handleLogin,
}) {
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

        <button type="submit">ログイン</button>
      </form>

      <p>{message}</p>
    </>
  );
}

export default Login;
