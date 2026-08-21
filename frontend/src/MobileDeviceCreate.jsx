import { useState } from "react";
import { useNavigate } from "react-router";
import { validateMobile } from "./utils/mobileValidation";
import { normalizeMobile } from "./utils/mobileNormalize";
import MobileForm from "./components/MobileForm";


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

 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    // ① 入力値を正規化
    const normalizedMobile = normalizeMobile(form);

    // ② 正規化後の値でバリデーション
    const newErrors = validateMobile(normalizedMobile);
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
          ...normalizedMobile,
          lenderReturnDueDate: normalizedMobile.lenderReturnDueDate || null,
          lenderReturnedDate: normalizedMobile.lenderReturnedDate || null,
        }),
      });

      if (response.ok) {
        alert("登録しました。");
        navigate("/mobile-devices");
      } else {
        const data = await response.json();
        setMessage(data.message ?? "登録に失敗しました。");
      }
    } catch (error) {
      console.error(error);
      setMessage("通信エラーが発生しました。");
    }
  };

  return (
    <>
      <header className="app-header">
        <div className="header-title">
          <h1>移動機管理アプリ</h1>
          <span className="page-title">＞新規登録</span>
        </div>
      </header>

      <main>
        {/* 入力欄 */}
        <form onSubmit={handleSubmit}>
          <MobileForm mobile={form} setMobile={setForm} errors={errors} />

          <div className="form-buttons">
            <button type="submit">登録</button>

            <button type="button" onClick={() => navigate("/mobile-devices")}>
              一覧へ戻る
            </button>
          </div>
          {message && <p className="form-error-message">{message}</p>}
        </form>
      </main>
    </>
  );
}

export default MobileDeviceCreate;
