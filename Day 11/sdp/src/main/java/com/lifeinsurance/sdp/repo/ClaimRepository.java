package com.lifeinsurance.sdp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lifeinsurance.sdp.model.Claim;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {
}
