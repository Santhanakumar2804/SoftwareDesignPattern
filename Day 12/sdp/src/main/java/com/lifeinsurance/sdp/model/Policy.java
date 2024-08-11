package com.lifeinsurance.sdp.model;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Policy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long policyID;
    private String policyName;
    private int policyDuration;
    private BigDecimal policyAmount;

    @OneToMany(mappedBy = "policy")
    @JsonIgnore
    private List<CustomerPolicy> customerPolicies;

    // Getters and Setters
    public Long getPolicyID() {
        return policyID;
    }

    public void setPolicyID(Long policyID) {
        this.policyID = policyID;
    }

    public String getPolicyName() {
        return policyName;
    }

    public void setPolicyName(String policyName) {
        this.policyName = policyName;
    }

    public int getPolicyDuration() {
        return policyDuration;
    }

    public void setPolicyDuration(int policyDuration) {
        this.policyDuration = policyDuration;
    }

    public BigDecimal getPolicyAmount() {
        return policyAmount;
    }

    public void setPolicyAmount(BigDecimal policyAmount) {
        this.policyAmount = policyAmount;
    }

    public List<CustomerPolicy> getCustomerPolicies() {
        return customerPolicies;
    }

    public void setCustomerPolicies(List<CustomerPolicy> customerPolicies) {
        this.customerPolicies = customerPolicies;
    }
}