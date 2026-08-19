import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { validateMobile } from "./utils/mobileValidation";
import MobileForm from "./components/MobileForm";

function MobileDeviceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [originalMobile, setOriginalMobile] = useState(null);
  const [errors, setErrors] = useState({});

  // URLのidを使って移動機の詳細データを取得
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

  // PUT /mobile-devices/{id} で移動機情報を更新
  const handleUpdate = async () => {
    // バリデーションチェック
    const newErrors = validateMobile(mobile);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/mobile-devices/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            ...mobile,
            lenderReturnDueDate: mobile.lenderReturnDueDate || null,
            lenderReturnedDate: mobile.lenderReturnedDate || null,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();

        setMobile(data.mobile);
        setOriginalMobile({ ...data.mobile });
        setIsEditing(false);
        setErrors({});

        alert(data.message);
      } else {
        setError("移動機情報の更新に失敗しました。");
      }
    } catch (error) {
      console.error(error);
      setError("通信エラーが発生しました。");
    }
  };

  // DELETE /mobile-devices/{id} で移動機情報を削除
  const handleDelete = async () => {
    const confirmed = window.confirm("本当に削除しますか？");

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/mobile-devices/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (response.ok) {
        alert("削除しました");
        navigate("/mobile-devices");
      } else {
        alert("移動機の削除に失敗しました");
      }
    } catch (error) {
      console.error(error);
      alert("通信エラーが発生しました");
    }
  };

  // 読み込み中やエラー時の表示を切り替える
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
      <header className="app-header">
        <div className="header-title">
          <h1>移動機管理アプリ</h1>
          <span className="page-title">＞詳細・編集</span>
        </div>
      </header>

      <main>
        <p className="mobile-id">
          ID：{String(mobile.mobileId).padStart(5, "0")}
        </p>

        <MobileForm
          mobile={mobile}
          setMobile={setMobile}
          errors={errors}
          readOnly={!isEditing}
        />

        <div className="form-buttons">
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
                  setErrors({});
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
                  setErrors({});
                  setIsEditing(true);
                }}
              >
                編集
              </button>

              <button type="button" onClick={handleDelete}>
                削除
              </button>

              <button type="button" onClick={() => navigate("/mobile-devices")}>
                一覧へ戻る
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default MobileDeviceDetail;
