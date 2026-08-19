import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function MobileDeviceList({ mobiles, onLogout, onReload }) {
  const navigate = useNavigate();

  const [selectedMobileId, setSelectedMobileId] = useState(null);

  // sessionStorage に保存されている検索条件を初期値として読み込む
  const [searchText, setSearchText] = useState(
    sessionStorage.getItem("mobileSearchText") ?? "",
  );

  const [selectedStatus, setSelectedStatus] = useState(
    sessionStorage.getItem("mobileSelectedStatus") ?? "",
  );

  useEffect(() => {
    onReload();
  }, []);

  // 検索条件が変わるたびに sessionStorage に保存
  useEffect(() => {
    sessionStorage.setItem("mobileSearchText", searchText);
    sessionStorage.setItem("mobileSelectedStatus", selectedStatus);
  }, [searchText, selectedStatus]);

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
      <header className="app-header">
        <div className="header-title">
          <h1>移動機管理アプリ</h1>
          <span className="page-title">＞移動機一覧</span>
        </div>

        <button onClick={onLogout}>ログアウト</button>
      </header>

      {/* 文字列検索欄 */}
      <div className="list-toolbar">
        <div className="search-area">
          <input
            type="text"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
              setSelectedMobileId(null);
            }}
            placeholder="機種名・カラーで検索"
          />

          {/* ステータス絞り込み検索 */}
          <select
            value={selectedStatus}
            onChange={(event) => {
              setSelectedStatus(event.target.value);
              setSelectedMobileId(null);
            }}
          >
            <option value="">すべて</option>
            <option value="試験中">試験中</option>
            <option value="部内貸出中">部内貸出中</option>
            <option value="返却済">返却済</option>
            <option value="受領済">受領済</option>
          </select>
        </div>

        <div className="list-buttons">
          {/* 新規登録ボタン */}
          <button onClick={() => navigate("/mobile-devices/new")}>
            新規登録
          </button>

          {/* 詳細表示ボタン */}
          <button
            disabled={selectedMobileId === null}
            onClick={() => navigate(`/mobile-devices/${selectedMobileId}`)}
          >
            詳細・編集
          </button>
        </div>
      </div>

      {/* DBに0件と、検索結果が0件を区別する */}
      {mobiles.length === 0 ? (
        <p>登録されている移動機はありません。</p>
      ) : filteredMobiles.length === 0 ? (
        <p>検索条件に一致する移動機はありません。</p>
      ) : (
        <table className="mobile-table">
          <thead>
            <tr>
              <th className="col-id">ID</th>
              <th className="col-name">機種名</th>
              <th className="col-serial">製造番号</th>
              <th className="col-color">カラー</th>
              <th className="col-date">借りた日</th>
              <th className="col-date">返却期限</th>
              <th className="col-status">ステータス</th>
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
                <td>{String(mobile.mobileId).padStart(5, "0")}</td>
                <td>{mobile.mobileName}</td>
                <td>{mobile.serialNumber}</td>
                <td>{mobile.mobileColor}</td>
                <td>{mobile.lenderBorrowedDate}</td>
                <td>{mobile.lenderReturnDueDate ?? "-"}</td>
                <td>{mobile.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default MobileDeviceList;
