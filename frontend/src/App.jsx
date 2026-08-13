import { useState } from "react";

function App() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [mobiles, setMobiles] = useState([]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          loginId: loginId,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setMessage(data.message);
        setAuthenticated(true);

        await fetchMobiles();
      } else {
        setMessage("ログインIDまたはパスワードが正しくありません");
      }
    } catch (error) {
      console.error(error);
      setMessage("通信エラーが発生しました");
    }
  };

 // ログアウト処理
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setAuthenticated(false);
        setMobiles([]);
        setLoginId("");
        setPassword("");
        setMessage("");
      } else {
        console.log("ログアウトに失敗しました");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //  移動機一覧取得
  const fetchMobiles = async () => {
    try {
      const response = await fetch("http://localhost:8080/mobile-devices", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setMobiles(data);

        console.log("移動機一覧:", data);
      } else {
        console.log("移動機一覧の取得に失敗しました");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (authenticated) {
    return (
      <>
        <header>
          <h1>移動機管理アプリ</h1>

          <button onClick={handleLogout}>ログアウト</button>
        </header>

        <main>
          <h2>移動機一覧</h2>

          {mobiles.length === 0 ? (
            <p>登録されている移動機はありません。</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>機種名</th>
                  <th>MACアドレス</th>
                  <th>製造番号</th>
                  <th>ステータス</th>
                </tr>
              </thead>

              <tbody>
                {mobiles.map((mobile) => (
                  <tr key={mobile.mobileId}>
                    <td>{mobile.mobileId}</td>
                    <td>{mobile.mobileName}</td>
                    <td>{mobile.macAddress}</td>
                    <td>{mobile.serialNumber}</td>
                    <td>{mobile.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </>
    );
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

        <button type="submit">ログイン</button>
      </form>

      <p>{message}</p>
    </>
  );
}

export default App;
