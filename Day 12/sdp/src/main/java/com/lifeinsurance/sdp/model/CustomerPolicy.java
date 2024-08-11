package com.lifeinsurance.sdp.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CustomerPolicy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long policyNo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_email", nullable = false)
    private Customer customer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "policy_id", nullable = false)
    private Policy policy;

    @Column(nullable = false)
    private String policyHolderName;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Column(nullable = false, unique = false)
    private String aadharNo;

    @Column(nullable = false, unique = false)
    private String panCardNo;

    @Column(nullable = false)
    private String phoneNo;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String nomineeName;

    @Column(nullable = false, unique = false)
    private String nomineeAadharNo;

    @Column(nullable = false, unique = false)
    private String nomineePanCardNo;

    @Column(nullable = false)
    private String nomineeRelationship;

    @Column(nullable = false)
    private boolean action = false;

    @OneToMany(mappedBy = "customerPolicy", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Claim> claims;

    @Column(nullable = false)
    private String policyName;

    @Column(nullable = false)
    private int policyDuration;

    @Column(nullable = false)
    private BigDecimal policyAmount;

    // Getters and Setters

    
}