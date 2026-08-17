import { useState } from "react";
import { useNavigate } from "react-router";
import { validateMobile } from "./utils/mobileValidation";

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
    lenderBorrowedDate: "",
    lenderReturnDueDate: "",
    lenderReturnedDate: "",
    status: "",
    remarks: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  // 入力値をformに反映
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    // バリデーションチェック
    const newErrors = validateMobile(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // POST /mobile-devices で移動機情報を登録
    try {
      const response = await fetch("http://localhost:8080/mobile-devices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...form,
          lenderReturnDueDate: form.lenderReturnDueDate || null,
          lenderReturnedDate: form.lenderReturnedDate || null,
        }),
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

        {/* 入力欄 */}
        <form onSubmit={handleSubmit}>
          <div>
            <label>機種名</label>
            <input
              type="text"
              name="mobileName"
              value={form.mobileName}
              onChange={handleChange}
              className={errors.mobileName ? "input-error" : ""}
            />
            {errors.mobileName && (
              <p className="error-message">{errors.mobileName}</p>
            )}
          </div>

          <div>
            <label>MACアドレス</label>
            <input
              type="text"
              name="macAddress"
              value={form.macAddress}
              onChange={handleChange}
              className={errors.mobileName ? "input-error" : ""}
            />
            {errors.macAddress && (
              <p className="error-message">{errors.macAddress}</p>
            )}
          </div>

          <div>
            <label>製造番号</label>
            <input
              type="text"
              name="serialNumber"
              value={form.serialNumber}
              onChange={handleChange}
              className={errors.mobileName ? "input-error" : ""}
            />
            {errors.serialNumber && (
              <p className="error-message">{errors.serialNumber}</p>
            )}
          </div>

          <div>
            <label>カラー</label>
            <input
              type="text"
              name="mobileColor"
              value={form.mobileColor}
              onChange={handleChange}
              className={errors.mobileName ? "input-error" : ""}
            />
            {errors.mobileColor && (
              <p className="error-message">{errors.mobileColor}</p>
            )}
          </div>

          <div>
            <label>ドライババージョン</label>
            <input
              type="text"
              name="driverVersion"
              value={form.driverVersion}
              onChange={handleChange}
            />
            {errors.driverVersion && (
              <p className="error-message">{errors.driverVersion}</p>
            )}
          </div>

          <div>
            <label>貸出元部署</label>
            <input
              type="text"
              name="lenderReturnDestination"
              value={form.lenderReturnDestination}
              onChange={handleChange}
            />
            {errors.lenderReturnDestination && (
              <p className="error-message">{errors.lenderReturnDestination}</p>
            )}
          </div>

          <div>
            <label>貸出元担当者</label>
            <input
              type="text"
              name="lenderContactPerson"
              value={form.lenderContactPerson}
              onChange={handleChange}
            />
            {errors.lenderContactPerson && (
              <p className="error-message">{errors.lenderContactPerson}</p>
            )}
          </div>

          <div>
            <label>借りた日</label>
            <input
              type="date"
              name="lenderBorrowedDate"
              value={form.lenderBorrowedDate}
              onChange={handleChange}
              className={errors.mobileName ? "input-error" : ""}
            />
            {errors.lenderBorrowedDate && (
              <p className="error-message">{errors.lenderBorrowedDate}</p>
            )}
          </div>

          <div>
            <label>返却期限</label>
            <input
              type="date"
              name="lenderReturnDueDate"
              value={form.lenderReturnDueDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>返却日</label>
            <input
              type="date"
              name="lenderReturnedDate"
              value={form.lenderReturnedDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>ステータス</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={errors.mobileName ? "input-error" : ""}
            >
              <option value="">選択してください</option>
              <option value="試験中">試験中</option>
              <option value="部内貸出中">部内貸出中</option>
              <option value="返却済">返却済</option>
              <option value="受領済">受領済</option>
            </select>
            {errors.status && <p className="error-message">{errors.status}</p>}
          </div>

          <div>
            <label>備考</label>
            <textarea
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
            />
            {errors.remarks && (
              <p className="error-message">{errors.remarks}</p>
            )}
          </div>

          <button type="submit">登録</button>

          <button type="button" onClick={() => navigate("/mobile-devices")}>
            一覧へ戻る
          </button>
        </form>

        {message && <p className="error-message">{message}</p>}
      </main>
    </>
  );
}

export default MobileDeviceCreate;
