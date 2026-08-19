function Login({
  loginId,
  password,
  message,
  setLoginId,
  setPassword,
  handleLogin,
}) {
  return (
    <main className="login-page">
      <div className="login-box">
        <h1>移動機管理アプリ</h1>

        <form onSubmit={handleLogin}>
          <div className="login-form-group">
            <label>ログインID</label>

            <input
              type="text"
              value={loginId}
              onChange={(event) => setLoginId(event.target.value)}
            />
          </div>

          <div className="login-form-group">
            <label>パスワード</label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="submit" className="login-button">
            ログイン
          </button>
        </form>

        {message && <p className="login-message">{message}</p>}
      </div>
    </main>
  );
}

export default Login;
