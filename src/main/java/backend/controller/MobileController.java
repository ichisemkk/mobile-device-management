// まずは一覧取得APIだけ作る最小構成

package backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.entity.Mobile;
import backend.service.MobileService;

@RestController
@RequestMapping("/mobile-devices")
public class MobileController {

    private final MobileService mobileService;

    public MobileController(MobileService mobileService) {
        this.mobileService = mobileService;
    }

    @GetMapping
    public List<Mobile> findAll() {
        return mobileService.findAll();
    }
}