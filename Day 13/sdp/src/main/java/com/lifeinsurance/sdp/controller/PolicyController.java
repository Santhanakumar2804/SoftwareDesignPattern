package com.lifeinsurance.sdp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lifeinsurance.sdp.model.Policy;
import com.lifeinsurance.sdp.service.PolicyService;


@RestController
@RequestMapping("/policies")
public class PolicyController {
    @Autowired
    private PolicyService policyService;

    @PostMapping
    public ResponseEntity<Policy> createPolicy(@RequestBody Policy policy) {
        return ResponseEntity.ok(policyService.savePolicy(policy));
    }

    @GetMapping
    public ResponseEntity<List<Policy>> getAllPolicies() {
        return ResponseEntity.ok(policyService.getAllPolicies());
    }

    @GetMapping("/{policyID}")
    public ResponseEntity<Policy> getPolicyById(@PathVariable Long policyID) {
        return ResponseEntity.ok(policyService.findPolicyById(policyID));
    }

    @DeleteMapping("/{policyID}")
    public ResponseEntity<String> deletePolicyById(@PathVariable Long policyID) {
        policyService.deletePolicyById(policyID);
        return ResponseEntity.ok("Policy deleted successfully");  
    }

}