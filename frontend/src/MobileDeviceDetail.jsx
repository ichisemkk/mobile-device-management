import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function MobileDeviceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
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
        <p>機種名：{mobile.mobileName}</p>
        <p>MACアドレス：{mobile.macAddress}</p>
        <p>製造番号：{mobile.serialNumber}</p>
        <p>カラー：{mobile.mobileColor}</p>
        <p>ドライババージョン：{mobile.driverVersion}</p>
        <p>ステータス：{mobile.status}</p>

        <button onClick={() => navigate("/mobile-devices")}>一覧へ戻る</button>
      </main>
    </>
  );
}

export default MobileDeviceDetail;
