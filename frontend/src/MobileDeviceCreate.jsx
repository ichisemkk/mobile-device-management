import { useState } from "react";
import { useNavigate } from "react-router";

function MobileDeviceCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    mobileName: "",
    macAddress: "",
    serialNumber: "",
    mobileColor: "",
    driverVersion: "",
    lenderReturnDestination: "",
    lenderContactPerson: "",
    status: "",
    remarks: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/mobile-devices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (response.ok) {
        navigate("/mobile-devices");
      } else {
        setMessage("移動機の登録に失敗しました。");
      }
    } catch (error) {
      console.error(error);
      setMessage("通信エラーが発生しました。");
    }
  };

  return (
    <>
      <header>
        <h1>移動機管理アプリ</h1>
      </header>

      <main>
        <h2>移動機新規登録</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>機種名</label>
            <input
              type="text"
              name="mobileName"
              value={form.mobileName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>MACアドレス</label>
            <input
              type="text"
              name="macAddress"
              value={form.macAddress}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>製造番号</label>
            <input
              type="text"
              name="serialNumber"
              value={form.serialNumber}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>カラー</label>
            <input
              type="text"
              name="mobileColor"
              value={form.mobileColor}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>ドライババージョン</label>
            <input
              type="text"
              name="driverVersion"
              value={form.driverVersion}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>貸出元部署</label>
            <input
              type="text"
              name="lenderReturnDestination"
              value={form.lenderReturnDestination}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>貸出元担当者</label>
            <input
              type="text"
              name="lenderContactPerson"
              value={form.lenderContactPerson}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>ステータス</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="">選択してください</option>
              <option value="試験中">試験中</option>
              <option value="部内貸出中">部内貸出中</option>
              <option value="返却済">返却済</option>
              <option value="受領済">受領済</option>
            </select>
          </div>

          <div>
            <label>備考</label>
            <textarea
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
            />
          </div>

          <button type="submit">登録</button>

          <button type="button" onClick={() => navigate("/mobile-devices")}>
            一覧へ戻る
          </button>
        </form>

        {message && <p>{message}</p>}
      </main>
    </>
  );
}

export default MobileDeviceCreate;
