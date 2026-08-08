package backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import backend.entity.Mobile;
import backend.repository.MobileRepository;


// まずは一覧取得だけできる最小構成
@Service
public class MobileService {

    private final MobileRepository mobileRepository;

    public MobileService(MobileRepository mobileRepository) {
        this.mobileRepository = mobileRepository;
    }

    public List<Mobile> findAll() {
        return mobileRepository.findAll();
    }
}