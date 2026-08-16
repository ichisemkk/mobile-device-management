export const validateMobile = (form) => {
  const newErrors = {};

  if (!form.mobileName.trim()) {
    newErrors.mobileName = "機種名は必須です。";
  } else if (form.mobileName.length > 50) {
    newErrors.mobileName = "機種名は50文字以内で入力してください。";
  }

  const macPattern = /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/;

  if (!form.macAddress.trim()) {
    newErrors.macAddress = "MACアドレスは必須です。";
  } else if (!macPattern.test(form.macAddress)) {
    newErrors.macAddress =
      "MACアドレスはAA:BB:CC:DD:EE:FF形式で入力してください。";
  }

  if (!form.serialNumber.trim()) {
    newErrors.serialNumber = "製造番号は必須です。";
  } else if (form.serialNumber.length > 50) {
    newErrors.serialNumber = "製造番号は50文字以内で入力してください。";
  }

  if (!form.mobileColor.trim()) {
    newErrors.mobileColor = "カラーは必須です。";
  } else if (form.mobileColor.length > 30) {
    newErrors.mobileColor = "カラーは30文字以内で入力してください。";
  }
  
  if ((form.driverVersion ?? "").length > 50) {
    newErrors.driverVersion =
      "ドライババージョンは50文字以内で入力してください。";
  }

  if ((form.lenderReturnDestination ?? "").length > 100) {
    newErrors.lenderReturnDestination =
      "貸出元部署は100文字以内で入力してください。";
  }

  if ((form.lenderContactPerson ?? "").length > 50) {
    newErrors.lenderContactPerson =
      "貸出元担当者は50文字以内で入力してください。";
  }

  if (!form.lenderBorrowedDate) {
    newErrors.lenderBorrowedDate = "借りた日は必須です。";
  }

  if (!form.status) {
    newErrors.status = "ステータスは必須です。";
  }

  if ((form.remarks ?? "").length > 500) {
    newErrors.remarks = "備考は500文字以内で入力してください。";
  }


  return newErrors;
};
