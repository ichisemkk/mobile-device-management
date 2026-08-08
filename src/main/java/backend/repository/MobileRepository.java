package backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.entity.Mobile;

public interface MobileRepository extends JpaRepository<Mobile, Long> {
}