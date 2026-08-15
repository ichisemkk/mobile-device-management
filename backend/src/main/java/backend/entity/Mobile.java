package backend.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "mobiles")
public class Mobile {

// バリデーションチェック
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "mobile_id")
private Long mobileId;

    // 機種名：必須、最大50文字
    @NotBlank(message = "機種名は必須です")
    @Size(max = 50, message = "機種名は50文字以内で入力してください")
    @Column(name = "mobile_name", nullable = false, length = 50)
    private String mobileName;


    // MACアドレス：必須、AA:BB:CC:DD:EE:FF形式
    @NotBlank(message = "MACアドレスは必須です")
    @Pattern(
            regexp = "^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$",
            message = "MACアドレスはAA:BB:CC:DD:EE:FF形式で入力してください"
    )
    @Column(name = "mac_address", nullable = false, unique = true, length = 17)
    private String macAddress;


    // 製造番号：必須、最大50文字
    @NotBlank(message = "製造番号は必須です")
    @Size(max = 50, message = "製造番号は50文字以内で入力してください")
    @Column(name = "serial_number", nullable = false, unique = true, length = 50)
    private String serialNumber;


    // カラー：必須、最大30文字
    @NotBlank(message = "カラーは必須です")
    @Size(max = 30, message = "カラーは30文字以内で入力してください")
    @Column(name = "mobile_color", nullable = false, length = 30)
    private String mobileColor;


    // ドライババージョン：任意、最大50文字
    @Size(max = 50, message = "ドライババージョンは50文字以内で入力してください")
    @Column(name = "driver_version", length = 50)
    private String driverVersion;


    // 貸出元部署：任意、最大100文字
    @Size(max = 100, message = "貸出元部署は100文字以内で入力してください")
    @Column(name = "lender_return_destination", length = 100)
    private String lenderReturnDestination;


    // 貸出元担当者：任意、最大50文字
    @Size(max = 50, message = "貸出元担当者は50文字以内で入力してください")
    @Column(name = "lender_contact_person", length = 50)
    private String lenderContactPerson;


    // 借りた日：必須
    @NotNull(message = "借りた日は必須です")
    @Column(name = "lender_borrowed_date", nullable = false)
    private LocalDate lenderBorrowedDate;


    // 返却日：任意
    @Column(name = "lender_returned_date")
    private LocalDate lenderReturnedDate;


    // 返却期限：任意
    @Column(name = "lender_return_due_date")
    private LocalDate lenderReturnDueDate;


    // ステータス：必須
    @NotBlank(message = "ステータスは必須です")
    @Column(name = "status", nullable = false, length = 50)
    private String status;


    // 備考：任意、最大500文字
    @Size(max = 500, message = "備考は500文字以内で入力してください")
    @Column(name = "remarks", length = 500)
    private String remarks;


    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;



    public Mobile() {
    }

    public Long getMobileId() {
        return mobileId;
    }

    public void setMobileId(Long mobileId) {
        this.mobileId = mobileId;
    }

    public String getMobileName() {
        return mobileName;
    }

    public void setMobileName(String mobileName) {
        this.mobileName = mobileName;
    }

    public String getMacAddress() {
        return macAddress;
    }

    public void setMacAddress(String macAddress) {
        this.macAddress = macAddress;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getMobileColor() {
        return mobileColor;
    }

    public void setMobileColor(String mobileColor) {
        this.mobileColor = mobileColor;
    }

    public String getDriverVersion() {
        return driverVersion;
    }

    public void setDriverVersion(String driverVersion) {
        this.driverVersion = driverVersion;
    }

    public String getLenderReturnDestination() {
        return lenderReturnDestination;
    }

    public void setLenderReturnDestination(String lenderReturnDestination) {
        this.lenderReturnDestination = lenderReturnDestination;
    }

    public String getLenderContactPerson() {
        return lenderContactPerson;
    }

    public void setLenderContactPerson(String lenderContactPerson) {
        this.lenderContactPerson = lenderContactPerson;
    }

    public LocalDate getLenderBorrowedDate() {
        return lenderBorrowedDate;
    }

    public void setLenderBorrowedDate(LocalDate lenderBorrowedDate) {
        this.lenderBorrowedDate = lenderBorrowedDate;
    }

    public LocalDate getLenderReturnedDate() {
        return lenderReturnedDate;
    }

    public void setLenderReturnedDate(LocalDate lenderReturnedDate) {
        this.lenderReturnedDate = lenderReturnedDate;
    }

    public LocalDate getLenderReturnDueDate() {
        return lenderReturnDueDate;
    }

    public void setLenderReturnDueDate(LocalDate lenderReturnDueDate) {
        this.lenderReturnDueDate = lenderReturnDueDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

}