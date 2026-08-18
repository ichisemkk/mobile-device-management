function MobileForm({ mobile, setMobile, errors, readOnly = false }) {
  return (
    <>
      <div className="form-group">
        <label>機種名</label>

        {readOnly ? (
          <span>{mobile.mobileName}</span>
        ) : (
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
              className={errors.mobileName ? "input-error" : ""}
            />

            {errors.mobileName && (
              <p className="error-message">{errors.mobileName}</p>
            )}
          </>
        )}
      </div>

      <div className="form-group">
        <label>MACアドレス</label>

        {readOnly ? (
          <span>{mobile.macAddress}</span>
        ) : (
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
              className={errors.macAddress ? "input-error" : ""}
            />

            {errors.macAddress && (
              <p className="error-message">{errors.macAddress}</p>
            )}
          </>
        )}
      </div>

      <div className="form-group">
        <label>製造番号</label>

        {readOnly ? (
          <span>{mobile.serialNumber}</span>
        ) : (
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
              className={errors.serialNumber ? "input-error" : ""}
            />

            {errors.serialNumber && (
              <p className="error-message">{errors.serialNumber}</p>
            )}
          </>
        )}
      </div>

      <div className="form-group">
        <label>カラー</label>

        {readOnly ? (
          <span>{mobile.mobileColor}</span>
        ) : (
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
              className={errors.mobileColor ? "input-error" : ""}
            />

            {errors.mobileColor && (
              <p className="error-message">{errors.mobileColor}</p>
            )}
          </>
        )}
      </div>

      <div className="form-group">
        <label>ドライババージョン</label>

        {readOnly ? (
          <span>{mobile.driverVersion}</span>
        ) : (
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
              className={errors.driverVersion ? "input-error" : ""}
            />

            {errors.driverVersion && (
              <p className="error-message">{errors.driverVersion}</p>
            )}
          </>
        )}
      </div>

      <div className="form-group">
        <label>貸出元部署</label>

        {readOnly ? (
          <span>{mobile.lenderReturnDestination}</span>
        ) : (
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
              className={errors.lenderReturnDestination ? "input-error" : ""}
            />

            {errors.lenderReturnDestination && (
              <p className="error-message">{errors.lenderReturnDestination}</p>
            )}
          </>
        )}
      </div>

      <div className="form-group">
        <label>貸出元担当者</label>

        {readOnly ? (
          <span>{mobile.lenderContactPerson}</span>
        ) : (
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
              className={errors.lenderContactPerson ? "input-error" : ""}
            />

            {errors.lenderContactPerson && (
              <p className="error-message">{errors.lenderContactPerson}</p>
            )}
          </>
        )}
      </div>

      <div className="form-group">
        <label>借りた日</label>

        {readOnly ? (
          <span>{mobile.lenderBorrowedDate}</span>
        ) : (
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
              className={errors.lenderBorrowedDate ? "input-error" : ""}
            />

            {errors.lenderBorrowedDate && (
              <p className="error-message">{errors.lenderBorrowedDate}</p>
            )}
          </>
        )}
      </div>

      <div className="form-group">
        <label>返却期限</label>

        {readOnly ? (
          <span>{mobile.lenderReturnDueDate}</span>
        ) : (
          <>
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
          </>
        )}
      </div>

      <div className="form-group">
        <label>返却日</label>

        {readOnly ? (
          <span>{mobile.lenderReturnedDate}</span>
        ) : (
          <>
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
          </>
        )}
      </div>

      <div className="form-group">
        <label>ステータス</label>

        {readOnly ? (
          <span>{mobile.status}</span>
        ) : (
          <>
            <select
              value={mobile.status}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  status: event.target.value,
                })
              }
              className={errors.status ? "input-error" : ""}
            >
              <option value="">選択してください</option>
              <option value="試験中">試験中</option>
              <option value="部内貸出中">部内貸出中</option>
              <option value="返却済">返却済</option>
              <option value="受領済">受領済</option>
            </select>

            {errors.status && <p className="error-message">{errors.status}</p>}
          </>
        )}
      </div>

      <div className="form-group">
        <label>備考</label>

        {readOnly ? (
          <span>{mobile.remarks}</span>
        ) : (
          <>
            <textarea
              value={mobile.remarks ?? ""}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  remarks: event.target.value,
                })
              }
              className={errors.remarks ? "input-error" : ""}
            />

            {errors.remarks && (
              <p className="error-message">{errors.remarks}</p>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default MobileForm;
