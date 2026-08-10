package backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import backend.entity.Mobile;
import backend.repository.MobileRepository;


// 一覧取得だけできる最小構成
@Service
public class MobileService {

    private final MobileRepository mobileRepository;

    public MobileService(MobileRepository mobileRepository) {
        this.mobileRepository = mobileRepository;
    }

    public List<Mobile> findAll() {
        return mobileRepository.findAll();
    }

// IDで1件取得する処理&404追加
    public Mobile findById(Long id) {
       return mobileRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "対象の移動機が見つかりません"
            ));
    }
//登録API
    public Mobile save(Mobile mobile) {
        return mobileRepository.save(mobile);
    }

//更新API
    public Mobile update(Long id, Mobile updatedMobile) {

        Mobile mobile = mobileRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "対象の移動機が見つかりません"
                ));

        mobile.setMobileName(updatedMobile.getMobileName());
        mobile.setMacAddress(updatedMobile.getMacAddress());
        mobile.setSerialNumber(updatedMobile.getSerialNumber());
        mobile.setMobileColor(updatedMobile.getMobileColor());
        mobile.setDriverVersion(updatedMobile.getDriverVersion());
        mobile.setLenderReturnDestination(updatedMobile.getLenderReturnDestination());
        mobile.setLenderContactPerson(updatedMobile.getLenderContactPerson());
        mobile.setLenderBorrowedDate(updatedMobile.getLenderBorrowedDate());
        mobile.setLenderReturnedDate(updatedMobile.getLenderReturnedDate());
        mobile.setLenderReturnDueDate(updatedMobile.getLenderReturnDueDate());
        mobile.setStatus(updatedMobile.getStatus());
        mobile.setRemarks(updatedMobile.getRemarks());

        return mobileRepository.save(mobile);
    }

//削除API
    public void delete(Long id) {

        Mobile mobile = mobileRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "対象の移動機が見つかりません"
                ));
        mobileRepository.delete(mobile);
    }

}