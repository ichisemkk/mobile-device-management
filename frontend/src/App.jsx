import "./App.css";
import { useState } from "react";
import MobileDeviceList from "./MobileDeviceList";
import Login from "./Login";
import MobileDeviceDetail from "./MobileDeviceDetail";

function App() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [mobiles, setMobiles] = useState([]);
  const [selectedMobile, setSelectedMobile] = useState(null);

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

  // 移動機詳細取得
  const fetchMobileDetail = async (mobileId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/mobile-devices/${mobileId}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (response.ok) {
        const data = await response.json();

        setSelectedMobile(data);

        console.log("移動機詳細:", data);
      } else {
        console.log("移動機詳細の取得に失敗しました");
      }
    } catch (error) {
      console.error(error);
    }
  };

  
// ログイン済みなら、一覧画面か詳細画面のどちらかを表示する
if (authenticated) {
  if (selectedMobile) {
    return (
      <MobileDeviceDetail
        mobile={selectedMobile}
        onBack={() => setSelectedMobile(null)}
      />
    );
  }
  return (
    <MobileDeviceList
      mobiles={mobiles}
      onLogout={handleLogout}
      onShowDetail={fetchMobileDetail}
    />
  );
}


  return (
    <Login
      loginId={loginId}
      password={password}
      message={message}
      setLoginId={setLoginId}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  );
}

export default App;
