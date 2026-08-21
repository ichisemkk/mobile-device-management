package backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.entity.Mobile;

public interface MobileRepository extends
        JpaRepository<Mobile, Long> {

//    MACアドレスと製造番号の存在確認メソッドを追加（新規登録時）
    boolean existsByMacAddress(String macAddress);
    boolean existsBySerialNumber(String serialNumber);

//    MACアドレスと製造番号の存在確認メソッドを追加（更新時）
//    自分自身のMACアドレス・製造番号は重複扱いしない
    boolean existsByMacAddressAndMobileIdNot(String macAddress, Long mobileId);
    boolean existsBySerialNumberAndMobileIdNot(String serialNumber, Long mobileId);
}