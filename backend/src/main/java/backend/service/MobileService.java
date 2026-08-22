package backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import backend.entity.Mobile;
import backend.repository.MobileRepository;


@Service
public class MobileService {

    private final MobileRepository mobileRepository;

    public MobileService(MobileRepository mobileRepository) {
        this.mobileRepository = mobileRepository;
    }

    // 一覧取得
    public List<Mobile> findAll() {
        return mobileRepository.findAll();
    }

    // IDで1件取得
    public Mobile findById(Long id) {
       return mobileRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "対象の移動機が見つかりません"
            ));
    }

    // 登録
    public Mobile create(Mobile mobile) {

    // MACアドレス・製造番号の重複チェック
    if (mobileRepository.existsByMacAddress(mobile.getMacAddress())) {
        throw new IllegalArgumentException(
                "このMACアドレスはすでに登録されています。"
        );
    }

    if (mobileRepository.existsBySerialNumber(mobile.getSerialNumber())) {
        throw new IllegalArgumentException(
                "この製造番号はすでに登録されています。"
        );
    }

    return mobileRepository.save(mobile);
    }

    // 更新
    public Mobile update(Long id, Mobile mobile) {

    Mobile existingMobile = mobileRepository.findById(id)
            .orElseThrow(() ->
                    new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "対象の移動機が見つかりません"
            ));

    if (mobileRepository.existsByMacAddressAndMobileIdNot(
            mobile.getMacAddress(), id)) {
        throw new IllegalArgumentException(
                "このMACアドレスはすでに登録されています。"
        );
    }

    if (mobileRepository.existsBySerialNumberAndMobileIdNot(
            mobile.getSerialNumber(), id)) {
        throw new IllegalArgumentException(
                "この製造番号はすでに登録されています。"
        );
    }

    existingMobile.setMobileName(mobile.getMobileName());
    existingMobile.setMacAddress(mobile.getMacAddress());
    existingMobile.setSerialNumber(mobile.getSerialNumber());
    existingMobile.setMobileColor(mobile.getMobileColor());
    existingMobile.setDriverVersion(mobile.getDriverVersion());
    existingMobile.setLenderReturnDestination(
            mobile.getLenderReturnDestination()
    );
    existingMobile.setLenderContactPerson(
            mobile.getLenderContactPerson()
    );
    existingMobile.setLenderBorrowedDate(
            mobile.getLenderBorrowedDate()
    );
    existingMobile.setLenderReturnedDate(
            mobile.getLenderReturnedDate()
    );
    existingMobile.setLenderReturnDueDate(
            mobile.getLenderReturnDueDate()
    );
    existingMobile.setStatus(mobile.getStatus());
    existingMobile.setRemarks(mobile.getRemarks());

        return mobileRepository.save(existingMobile);
    }

    // 削除
    public void delete(Long id) {

        Mobile mobile = mobileRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "対象の移動機が見つかりません"
                ));
        mobileRepository.delete(mobile);
    }

}