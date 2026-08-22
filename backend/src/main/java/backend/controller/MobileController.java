package backend.controller;

import java.util.List;
import java.util.Map;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.http.ResponseEntity;

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

    // IDで1件取得
    @GetMapping("/{id}")
    public Mobile findById(@PathVariable Long id) {
        return mobileService.findById(id);
    }

    // 登録
    @PostMapping
    public ResponseEntity<Map<String, Object>> create(
        @Valid @RequestBody Mobile mobile) {

        try {
            Mobile savedMobile = mobileService.create(mobile);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "result", "success",
                        "message", "登録しました",
                        "mobile", savedMobile
                ));

        } catch (IllegalArgumentException e) {

        return ResponseEntity
                .badRequest()
                .body(Map.of(
                        "result", "error",
                        "message", e.getMessage()
                ));
        }
    }

    // 更新
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(
        @PathVariable Long id,
        @Valid @RequestBody Mobile mobile) {

        try {
            Mobile updatedMobile = mobileService.update(id, mobile);

        return ResponseEntity.ok(
                Map.of(
                        "result", "success",
                        "message", "更新しました",
                        "mobile", updatedMobile
                )
        );

        } catch (IllegalArgumentException e) {

        return ResponseEntity
                .badRequest()
                .body(
                        Map.of(
                                "result", "error",
                                "message", e.getMessage()
                        )
                );
        }
    }

    // 削除
    @DeleteMapping("/{id}")
    public Map<String, String> delete(
        @PathVariable Long id) {

       mobileService.delete(id);

       return Map.of(
               "result", "success",
               "message", "削除しました"
       );
    }
}