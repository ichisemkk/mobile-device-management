function MobileDeviceDetail({ mobile, onBack }) {
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

        <button onClick={onBack}>一覧へ戻る</button>
      </main>
    </>
  );
}

export default MobileDeviceDetail;
