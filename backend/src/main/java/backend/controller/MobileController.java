// まずは一覧取得APIだけ作る最小構成

package backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

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

// IDで1件取得する処理
    @GetMapping("/{id}")
    public Mobile findById(@PathVariable Long id) {
        return mobileService.findById(id);
    }

//登録API
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> create(@RequestBody Mobile mobile) {

        Mobile savedMobile = mobileService.save(mobile);

        return Map.of(
                "result", "success",
                "message", "登録しました",
                "mobile", savedMobile
        );
    }

//更新API
    @PutMapping("/{id}")
    public Map<String, Object> update(
            @PathVariable Long id,
            @RequestBody Mobile mobile) {

        Mobile updatedMobile = mobileService.update(id, mobile);

        return Map.of(
                "result", "success",
                "message", "更新しました",
                "mobile", updatedMobile
        );
    }

//削除API
   @DeleteMapping("/{id}")
   public Map<String, String> delete(@PathVariable Long id) {

       mobileService.delete(id);

       return Map.of(
               "result", "success",
               "message", "削除しました"
       );
}


}