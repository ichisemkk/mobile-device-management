function MobileForm({
  mobile,
  setMobile,
  errors = {},
  readOnly = false,
 }) {
  
  return (
    <div className="mobile-form-layout">
      {/* 移動機情報 */}
      <div className="form-section">
        <h3>移動機情報</h3>

        <div className="form-group">
          <label>
            機種名
            <span className="required-mark">*</span>
          </label>

          <div className="form-control">
            <input
              type="text"
              value={mobile.mobileName ?? ""}
              readOnly={readOnly}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  mobileName: event.target.value,
                })
              }
              className={
                readOnly
                  ? "readonly-input"
                  : errors.mobileName
                    ? "input-error"
                    : ""
              }
            />

            {!readOnly && errors.mobileName && (
              <p className="error-message">{errors.mobileName}</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>
            MACアドレス
            <span className="required-mark">*</span>
          </label>

          <div className="form-control">
            <input
              type="text"
              value={mobile.macAddress ?? ""}
              readOnly={readOnly}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  macAddress: event.target.value,
                })
              }
              className={
                readOnly
                  ? "readonly-input"
                  : errors.macAddress
                    ? "input-error"
                    : ""
              }
            />

            {!readOnly && errors.macAddress && (
              <p className="error-message">{errors.macAddress}</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>
            製造番号
            <span className="required-mark">*</span>
          </label>

          <div className="form-control">
            <input
              type="text"
              value={mobile.serialNumber ?? ""}
              readOnly={readOnly}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  serialNumber: event.target.value,
                })
              }
              className={
                readOnly
                  ? "readonly-input"
                  : errors.serialNumber
                    ? "input-error"
                    : ""
              }
            />

            {!readOnly && errors.serialNumber && (
              <p className="error-message">{errors.serialNumber}</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>
            カラー
            <span className="required-mark">*</span>
          </label>

          <div className="form-control">
            <input
              type="text"
              value={mobile.mobileColor ?? ""}
              readOnly={readOnly}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  mobileColor: event.target.value,
                })
              }
              className={
                readOnly
                  ? "readonly-input"
                  : errors.mobileColor
                    ? "input-error"
                    : ""
              }
            />

            {!readOnly && errors.mobileColor && (
              <p className="error-message">{errors.mobileColor}</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>ドライババージョン</label>

          <div className="form-control">
            <input
              type="text"
              value={mobile.driverVersion ?? ""}
              readOnly={readOnly}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  driverVersion: event.target.value,
                })
              }
              className={
                readOnly
                  ? "readonly-input"
                  : errors.driverVersion
                    ? "input-error"
                    : ""
              }
            />

            {!readOnly && errors.driverVersion && (
              <p className="error-message">{errors.driverVersion}</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>備考</label>

          <div className="form-control">
            <textarea
              value={mobile.remarks ?? ""}
              readOnly={readOnly}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  remarks: event.target.value,
                })
              }
              className={
                readOnly
                  ? "readonly-input"
                  : errors.remarks
                    ? "input-error"
                    : ""
              }
            />

            {!readOnly && errors.remarks && (
              <p className="error-message">{errors.remarks}</p>
            )}
          </div>
        </div>
      </div>

      {/* 貸出元情報 */}
      <div className="form-section">
        <h3>貸出元情報</h3>

        <div className="form-group">
          <label>貸出元部署</label>

          <div className="form-control">
            <input
              type="text"
              value={mobile.lenderReturnDestination ?? ""}
              readOnly={readOnly}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  lenderReturnDestination: event.target.value,
                })
              }
              className={
                readOnly
                  ? "readonly-input"
                  : errors.lenderReturnDestination
                    ? "input-error"
                    : ""
              }
            />

            {!readOnly && errors.lenderReturnDestination && (
              <p className="error-message">{errors.lenderReturnDestination}</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>貸出元担当者</label>

          <div className="form-control">
            <input
              type="text"
              value={mobile.lenderContactPerson ?? ""}
              readOnly={readOnly}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  lenderContactPerson: event.target.value,
                })
              }
              className={
                readOnly
                  ? "readonly-input"
                  : errors.lenderContactPerson
                    ? "input-error"
                    : ""
              }
            />

            {!readOnly && errors.lenderContactPerson && (
              <p className="error-message">{errors.lenderContactPerson}</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>
            借りた日
            <span className="required-mark">*</span>
          </label>

          <div className="form-control">
            <input
              type="date"
              value={mobile.lenderBorrowedDate ?? ""}
              readOnly={readOnly}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  lenderBorrowedDate: event.target.value,
                })
              }
              className={
                readOnly
                  ? "readonly-input"
                  : errors.lenderBorrowedDate
                    ? "input-error"
                    : ""
              }
            />

            {!readOnly && errors.lenderBorrowedDate && (
              <p className="error-message">{errors.lenderBorrowedDate}</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>返却期限</label>

          <div className="form-control">
            <input
              type="date"
              value={mobile.lenderReturnDueDate ?? ""}
              readOnly={readOnly}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  lenderReturnDueDate: event.target.value,
                })
              }
              className={readOnly ? "readonly-input" : ""}
            />
          </div>
        </div>

        <div className="form-group">
          <label>返却日</label>

          <div className="form-control">
            <input
              type="date"
              value={mobile.lenderReturnedDate ?? ""}
              readOnly={readOnly}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  lenderReturnedDate: event.target.value,
                })
              }
              className={readOnly ? "readonly-input" : ""}
            />
          </div>
        </div>

        <div className="form-group">
          <label>
            ステータス
            <span className="required-mark">*</span>
          </label>

          <div className="form-control">
            <select
              value={mobile.status ?? ""}
              disabled={readOnly}
              onChange={(event) =>
                setMobile({
                  ...mobile,
                  status: event.target.value,
                })
              }
              className={
                readOnly ? "readonly-input" : errors.status ? "input-error" : ""
              }
            >
              <option value="">選択してください</option>
              <option value="試験中">試験中</option>
              <option value="部内貸出中">部内貸出中</option>
              <option value="返却済">返却済</option>
              <option value="受領済">受領済</option>
            </select>

            {!readOnly && errors.status && (
              <p className="error-message">{errors.status}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileForm;
