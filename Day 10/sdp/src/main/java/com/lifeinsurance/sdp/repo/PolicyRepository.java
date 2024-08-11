package com.lifeinsurance.sdp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lifeinsurance.sdp.model.Policy;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long>{

}