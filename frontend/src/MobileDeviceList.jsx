import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function MobileDeviceList({
     mobiles,
     onLogout,
     onReload }) {
  const navigate = useNavigate();
  const [selectedMobileId, setSelectedMobileId] = useState(null);

   useEffect(() => {
     onReload();
   }, []);

  return (
    <>
      <header>
        <h1>移動機管理アプリ</h1>

        <button onClick={onLogout}>ログアウト</button>
      </header>

      <main>
        <h2>移動機一覧</h2>

        {/* 詳細表示ボタン */}
        <button
          disabled={selectedMobileId === null}
          onClick={() => navigate(`/mobile-devices/${selectedMobileId}`)}
        >
          詳細
        </button>

        {/* 新規登録ボタン */}
        <button onClick={() => navigate("/mobile-devices/new")}>
          新規登録
        </button>

        {/* 動作確認用 どのIDが選択されているか画面に表示する*/}
        <p>
          選択中ID：
          {selectedMobileId === null ? "未選択" : selectedMobileId}
        </p>
        {/* 動作確認用 */}

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
                <tr
                  key={mobile.mobileId}
                  onClick={() => setSelectedMobileId(mobile.mobileId)}
                  className={
                    selectedMobileId === mobile.mobileId ? "selected-row" : ""
                  }
                >
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

export default MobileDeviceList;
