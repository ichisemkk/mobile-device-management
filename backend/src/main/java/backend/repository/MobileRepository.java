package backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.entity.Mobile;

public interface MobileRepository extends
        JpaRepository<Mobile, Long> {

//    新規登録時の重複確認
    boolean existsByMacAddress(String macAddress);
    boolean existsBySerialNumber(String serialNumber);

//    更新時の重複確認（自分自身は除外）
    boolean existsByMacAddressAndMobileIdNot(String macAddress, Long mobileId);
    boolean existsBySerialNumberAndMobileIdNot(String serialNumber, Long mobileId);
}