package com.lifeinsurance.sdp.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lifeinsurance.sdp.model.CustomerPolicy;
import com.lifeinsurance.sdp.service.CustomerPolicyService;

@RestController
@RequestMapping("/customer-policies")
public class CustomerPolicyController {
    @Autowired
    private CustomerPolicyService customerPolicyService;

    @PostMapping
    public ResponseEntity<CustomerPolicy> createCustomerPolicy(@RequestBody CustomerPolicy customerPolicy) {
        try {
            CustomerPolicy savedCustomerPolicy = customerPolicyService.saveCustomerPolicy(customerPolicy);
            return ResponseEntity.ok(savedCustomerPolicy);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{policyNo}/action")
    public ResponseEntity<CustomerPolicy> updatePolicyAction(@PathVariable Long policyNo, @RequestBody Map<String, Boolean> action) {
        CustomerPolicy updatedPolicy = customerPolicyService.updatePolicyAction(policyNo, action.get("action"));
        return ResponseEntity.ok(updatedPolicy);
    }
}