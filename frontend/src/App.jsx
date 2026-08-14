import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import MobileDeviceList from "./MobileDeviceList";
import Login from "./Login";
import MobileDeviceDetail from "./MobileDeviceDetail";
import MobileDeviceCreate from "./MobileDeviceCreate";

function App() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [mobiles, setMobiles] = useState([]);

  // /auth/me でログイン状態を確認
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          setAuthenticated(true);
          await fetchMobiles();
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
        setAuthenticated(false);
      } finally {
        setAuthChecking(false);
      }
    };

    checkAuthentication();
  }, []);

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

        navigate("/mobile-devices");
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
        navigate("/login");
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

  // 認証確認が終わるまではRoutesを表示しない
  if (authChecking) {
    return <p>認証状態を確認中...</p>;
  }

  // URLに応じてログイン画面・移動機一覧画面・移動機詳細画面を切り替える
  // 未ログインの場合はログイン画面へリダイレクトする
  return (
    <Routes>
      {/* ログイン画面 */}
      <Route
        path="/login"
        element={
          <Login
            loginId={loginId}
            password={password}
            message={message}
            setLoginId={setLoginId}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        }
      />

      {/* 移動機一覧画面：未ログインならログイン画面へ */}
      <Route
        path="/mobile-devices"
        element={
          authenticated ? (
            <MobileDeviceList mobiles={mobiles} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* 移動機新規登録画面 */}
      <Route
        path="/mobile-devices/new"
        element={
          authenticated ? (
            <MobileDeviceCreate />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* 移動機詳細画面  :id に選択した移動機IDが入る */}
      <Route
        path="/mobile-devices/:id"
        element={
          authenticated ? (
            <MobileDeviceDetail />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      {/* 定義されていないURLはログイン画面へ */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
