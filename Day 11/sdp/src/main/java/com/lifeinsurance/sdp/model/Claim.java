package com.lifeinsurance.sdp.model;

import java.math.BigDecimal;
import java.time.LocalDate;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
public class Claim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long claimNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "policy_no")
    @JsonIgnore
    private CustomerPolicy customerPolicy;

    @Column(nullable = false)
    private BigDecimal amountPerMonth;

    @Column(nullable = false)
    private String claimReason;

    @Column(nullable = false)
    private String incidentDescription;

    @Column(nullable = false)
    private LocalDate dateOfIncident;

    // @Column(nullable = false)
    private boolean action = false;

    // Getters and Setters

    public Long getClaimNo() {
        return claimNo;
    }

    public void setClaimNo(Long claimNo) {
        this.claimNo = claimNo;
    }

    public CustomerPolicy getCustomerPolicy() {
        return customerPolicy;
    }

    public void setCustomerPolicy(CustomerPolicy customerPolicy) {
        this.customerPolicy = customerPolicy;
    }

    public BigDecimal getAmountPerMonth() {
        return amountPerMonth;
    }

    public void setAmountPerMonth(BigDecimal amountPerMonth) {
        this.amountPerMonth = amountPerMonth;
    }

    public String getClaimReason() {
        return claimReason;
    }

    public void setClaimReason(String claimReason) {
        this.claimReason = claimReason;
    }

    public String getIncidentDescription() {
        return incidentDescription;
    }

    public void setIncidentDescription(String incidentDescription) {
        this.incidentDescription = incidentDescription;
    }

    public LocalDate getDateOfIncident() {
        return dateOfIncident;
    }

    public void setDateOfIncident(LocalDate dateOfIncident) {
        this.dateOfIncident = dateOfIncident;
    }

    public boolean isAction() {
        return action;
    }

    public void setAction(boolean action) {
        this.action = action;
    }
}