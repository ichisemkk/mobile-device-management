function MobileDeviceList({ mobiles, onLogout }) {
  return (
    <>
      <header>
        <h1>移動機管理アプリ</h1>

        <button onClick={onLogout}>ログアウト</button>
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

export default MobileDeviceList;
