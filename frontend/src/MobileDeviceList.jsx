import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function MobileDeviceList({
     mobiles,
     onLogout,
     onReload }) {
  const navigate = useNavigate();

  const [selectedMobileId, setSelectedMobileId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

   useEffect(() => {
     onReload();
   }, []);

// 文字列検索＆ステータス絞り込み検索   
 const filteredMobiles = mobiles.filter((mobile) => {
  const keyword = searchText.trim().toLowerCase();

  const matchesKeyword =
    mobile.mobileName.toLowerCase().includes(keyword) ||
    mobile.mobileColor.toLowerCase().includes(keyword);

  const matchesStatus =
    selectedStatus === "" || mobile.status === selectedStatus;

  return matchesKeyword && matchesStatus;
});

  return (
    <>
      <header>
        <h1>移動機管理アプリ</h1>

        <button onClick={onLogout}>ログアウト</button>
      </header>

      <main>
        <h2>移動機一覧</h2>

        {/* 文字列検索欄 */}
        <div>
          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="機種名・カラーで検索"
          />
        </div>

        {/* ステータス絞り込み検索 */}
        <select
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value)}
        >
          <option value="">すべて</option>
          <option value="試験中">試験中</option>
          <option value="部内貸出中">部内貸出中</option>
          <option value="返却済">返却済</option>
          <option value="受領済">受領済</option>
        </select>

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

        {/* DBに0件と、検索結果が0件を区別する */}
        {mobiles.length === 0 ? (
          <p>登録されている移動機はありません。</p>
        ) : filteredMobiles.length === 0 ? (
          <p>検索条件に一致する移動機はありません。</p>
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
              {filteredMobiles.map((mobile) => (
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
