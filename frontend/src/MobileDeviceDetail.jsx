import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function MobileDeviceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mobile, setMobile] = useState(null);

  useEffect(() => {
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
        } else {
          console.log("移動機詳細の取得に失敗しました");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMobileDetail();
  }, [id]);

  if (!mobile) {
    return <p>読み込み中...</p>;
  }

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
