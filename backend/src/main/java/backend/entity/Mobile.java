package backend.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "mobiles")
public class Mobile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mobile_id")
    private Long mobileId;

    @Column(name = "mobile_name", nullable = false, length = 100)
    private String mobileName;

    @Column(name = "mac_address", nullable = false, unique = true, length = 50)
    private String macAddress;

    @Column(name = "serial_number", nullable = false, unique = true, length = 100)
    private String serialNumber;

    @Column(name = "mobile_color", nullable = false, length = 50)
    private String mobileColor;

    @Column(name = "driver_version", length = 100)
    private String driverVersion;

    @Column(name = "lender_return_destination", nullable = false, length = 255)
    private String lenderReturnDestination;

    @Column(name = "lender_contact_person", length = 100)
    private String lenderContactPerson;

    @Column(name = "lender_borrowed_date")
    private LocalDate lenderBorrowedDate;

    @Column(name = "lender_returned_date")
    private LocalDate lenderReturnedDate;

    @Column(name = "lender_return_due_date")
    private LocalDate lenderReturnDueDate;

    @Column(name = "status", nullable = false, length = 50)
    private String status;

    @Column(name = "remarks")
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