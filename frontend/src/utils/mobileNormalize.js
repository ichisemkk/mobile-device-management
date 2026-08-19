export function normalizeMobile(mobile) {
  return {
    ...mobile,

    mobileName: mobile.mobileName?.normalize("NFKC").trim() ?? "",

    macAddress: mobile.macAddress?.normalize("NFKC").trim().toUpperCase() ?? "",

    serialNumber: mobile.serialNumber?.normalize("NFKC").trim() ?? "",

    mobileColor: mobile.mobileColor?.normalize("NFKC").trim() ?? "",

    driverVersion: mobile.driverVersion?.normalize("NFKC").trim() ?? "",
  };
}
