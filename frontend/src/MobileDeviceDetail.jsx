import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { validateMobile } from "./utils/mobileValidation";

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
      <header>
        <h1>移動機管理アプリ</h1>
      </header>

      <main>
        <h2>移動機詳細</h2>

        <p>ID：{mobile.mobileId}</p>

        <div>
          <label>機種名：</label>

          {isEditing ? (
            <>
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
              {errors.mobileName && (
                <p className="error-message">{errors.mobileName}</p>
              )}
            </>
          ) : (
            <span>{mobile.mobileName}</span>
          )}
        </div>

        <div>
          <label>MACアドレス：</label>
          {isEditing ? (
            <>
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
              {errors.macAddress && (
                <p className="error-message">{errors.macAddress}</p>
              )}
            </>
          ) : (
            <span>{mobile.macAddress}</span>
          )}
        </div>

        <div>
          <label>製造番号：</label>
          {isEditing ? (
            <>
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
              {errors.serialNumber && (
                <p className="error-message">{errors.serialNumber}</p>
              )}
            </>
          ) : (
            <span>{mobile.serialNumber}</span>
          )}
        </div>

        <div>
          <label>カラー：</label>
          {isEditing ? (
            <>
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
              {errors.mobileColor && (
                <p className="error-message">{errors.mobileColor}</p>
              )}
            </>
          ) : (
            <span>{mobile.mobileColor}</span>
          )}
        </div>

        <div>
          <label>ドライババージョン：</label>
          {isEditing ? (
            <>
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
              {errors.driverVersion && (
                <p className="error-message">{errors.driverVersion}</p>
              )}
            </>
          ) : (
            <span>{mobile.driverVersion}</span>
          )}
        </div>

        <div>
          <label>貸出元部署：</label>
          {isEditing ? (
            <>
              <input
                type="text"
                value={mobile.lenderReturnDestination ?? ""}
                onChange={(event) =>
                  setMobile({
                    ...mobile,
                    lenderReturnDestination: event.target.value,
                  })
                }
              />
              {errors.lenderReturnDestination && (
                <p className="error-message">
                  {errors.lenderReturnDestination}
                </p>
              )}
            </>
          ) : (
            <span>{mobile.lenderReturnDestination}</span>
          )}
        </div>

        <div>
          <label>貸出元担当者：</label>
          {isEditing ? (
            <>
              <input
                type="text"
                value={mobile.lenderContactPerson ?? ""}
                onChange={(event) =>
                  setMobile({
                    ...mobile,
                    lenderContactPerson: event.target.value,
                  })
                }
              />
              {errors.lenderContactPerson && (
                <p className="error-message">{errors.lenderContactPerson}</p>
              )}
            </>
          ) : (
            <span>{mobile.lenderContactPerson}</span>
          )}
        </div>

        <div>
          <label>借りた日：</label>
          {isEditing ? (
            <>
              <input
                type="date"
                value={mobile.lenderBorrowedDate ?? ""}
                onChange={(event) =>
                  setMobile({
                    ...mobile,
                    lenderBorrowedDate: event.target.value,
                  })
                }
              />
              {errors.lenderBorrowedDate && (
                <p className="error-message">
                   {errors.lenderBorrowedDate}
                </p>
              )}
            </>
          ) : (
            <span>{mobile.lenderBorrowedDate}</span>
          )}
        </div>

        <div>
          <label>返却期限：</label>
          {isEditing ? (
            <input
              type="date"
              value={mobile.lenderReturnDueDate ?? ""}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  lenderReturnDueDate: event.target.value,
                })
              }
            />
          ) : (
            <span>{mobile.lenderReturnDueDate}</span>
          )}
        </div>

        <div>
          <label>返却日：</label>
          {isEditing ? (
            <input
              type="date"
              value={mobile.lenderReturnedDate ?? ""}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  lenderReturnedDate: event.target.value,
                })
              }
            />
          ) : (
            <span>{mobile.lenderReturnedDate}</span>
          )}
        </div>

        <div>
          <label>ステータス：</label>
          {isEditing ? (
            <>
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
              {errors.status &&(
                <p className="error-message">
                   {errors.status}
                </p>
              )}
            </>
          ) : (
            <span>{mobile.status}</span>
          )}
        </div>

        <div>
          <label>備考：</label>
          {isEditing ? (
            <>
              <textarea
                value={mobile.remarks ?? ""}
                onChange={(event) =>
                  setMobile({
                    ...mobile,
                    remarks: event.target.value,
                  })
                }
              />
              {errors.remarks &&(
                <p className="error-message">
                  {errors.remarks}
                </p>
              )}
            </>
          ) : (
            <span>{mobile.remarks}</span>
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
      </main>
    </>
  );
}

export default MobileDeviceDetail;
