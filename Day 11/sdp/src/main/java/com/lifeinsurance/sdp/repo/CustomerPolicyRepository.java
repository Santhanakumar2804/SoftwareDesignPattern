package com.lifeinsurance.sdp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lifeinsurance.sdp.model.CustomerPolicy;

@Repository
public interface CustomerPolicyRepository extends JpaRepository<CustomerPolicy, Long>{
}
