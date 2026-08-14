import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function MobileDeviceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [originalMobile, setOriginalMobile] = useState(null);
  
  // TODO: 詳細画面で更新後、一覧データを再取得する

  //URLの id を使って移動機の詳細データを取得する処理
  useEffect(() => {
    // 詳細取得処理
    const fetchMobileDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/mobile-devices/${id}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (response.ok) {
          const data = await response.json();
          setMobile(data);
        } else if (response.status === 404) {
          setError("指定された移動機は存在しません。");
        } else {
          setError("移動機詳細の取得に失敗しました。");
        }
      } catch (error) {
        console.error(error);
        setError("通信エラーが発生しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchMobileDetail();
  }, [id]);

  //   更新ボタンで PUT /mobile-devices/{id} を呼んでDB更新
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/mobile-devices/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(mobile),
        },
      );

      if (response.ok) {
        const data = await response.json();

        setMobile(data.mobile);
        setOriginalMobile({ ...data.mobile });
        setIsEditing(false);

        alert(data.message);
      } else {
        setError("移動機情報の更新に失敗しました。");
      }
    } catch (error) {
      console.error(error);
      setError("通信エラーが発生しました。");
    }
  };

  // 読み込み中やエラー時の表示を切り替える処理;
  // ① 読み込み中
  if (loading) {
    return <p>読み込み中...</p>;
  }

  // ② エラー時
  if (error) {
    return (
      <>
        <p>{error}</p>
        <button onClick={() => navigate("/mobile-devices")}>一覧へ戻る</button>
      </>
    );
  }

  // ③ 正常取得できたら詳細画面
  return (
    <>
      <header>
        <h1>移動機管理アプリ</h1>
      </header>

      <main>
        <h2>移動機詳細</h2>

        <p>ID：{mobile.mobileId}</p>

        <div>
          <label>機種名：</label>

          {isEditing ? (
            <input
              type="text"
              value={mobile.mobileName}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  mobileName: event.target.value,
                })
              }
            />
          ) : (
            <span>{mobile.mobileName}</span>
          )}
        </div>

        <div>
          <label>MACアドレス：</label>
          {isEditing ? (
            <input
              type="text"
              value={mobile.macAddress}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  macAddress: event.target.value,
                })
              }
            />
          ) : (
            <span>{mobile.macAddress}</span>
          )}
        </div>

        <div>
          <label>製造番号：</label>
          {isEditing ? (
            <input
              type="text"
              value={mobile.serialNumber}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  serialNumber: event.target.value,
                })
              }
            />
          ) : (
            <span>{mobile.serialNumber}</span>
          )}
        </div>

        <div>
          <label>カラー：</label>
          {isEditing ? (
            <input
              type="text"
              value={mobile.mobileColor}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  mobileColor: event.target.value,
                })
              }
            />
          ) : (
            <span>{mobile.mobileColor}</span>
          )}
        </div>

        <div>
          <label>ドライババージョン：</label>
          {isEditing ? (
            <input
              type="text"
              value={mobile.driverVersion ?? ""}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  driverVersion: event.target.value,
                })
              }
            />
          ) : (
            <span>{mobile.driverVersion}</span>
          )}
        </div>

        <div>
          <label>ステータス：</label>
          {isEditing ? (
            <select
              value={mobile.status}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  status: event.target.value,
                })
              }
            >
              <option value="試験中">試験中</option>
              <option value="部内貸出中">部内貸出中</option>
              <option value="返却済">返却済</option>
              <option value="受領済">受領済</option>
            </select>
          ) : (
            <span>{mobile.status}</span>
          )}
        </div>

        {isEditing ? (
          <>
            <button type="button" onClick={handleUpdate}>
              更新
            </button>

            {/* 編集前の値に戻して、編集モードを終了する */}
            <button
              type="button"
              onClick={() => {
                setMobile(originalMobile);
                setIsEditing(false);
              }}
            >
              キャンセル
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                setOriginalMobile({ ...mobile });
                setIsEditing(true);
              }}
            >
              編集
            </button>

            <button type="button" onClick={() => navigate("/mobile-devices")}>
              一覧へ戻る
            </button>
          </>
        )}
      </main>
    </>
  );
}

export default MobileDeviceDetail;
