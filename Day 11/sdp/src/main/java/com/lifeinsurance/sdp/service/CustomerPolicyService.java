package com.lifeinsurance.sdp.service;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import com.lifeinsurance.sdp.model.Customer;
import com.lifeinsurance.sdp.model.CustomerPolicy;
import com.lifeinsurance.sdp.model.Policy;
import com.lifeinsurance.sdp.repo.CustomerPolicyRepository;
import com.lifeinsurance.sdp.repo.CustomerRepository;
import com.lifeinsurance.sdp.repo.PolicyRepository;

@Service
public class CustomerPolicyService {
    @Autowired
    private CustomerPolicyRepository customerPolicyRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PolicyRepository policyRepository;

    public CustomerPolicy saveCustomerPolicy(CustomerPolicy customerPolicy) {
        // Fetch existing Customer and Policy from the database
        Optional<Customer> customerOpt = customerRepository.findByEmail(customerPolicy.getCustomer().getEmail());
        Optional<Policy> policyOpt = policyRepository.findById(customerPolicy.getPolicy().getPolicyID());

        if (!customerOpt.isPresent() || !policyOpt.isPresent()) {
            throw new IllegalArgumentException("Customer or Policy not found");
        }

        // Set the existing entities
        Customer customer = customerOpt.get();
        Policy policy = policyOpt.get();

        customerPolicy.setCustomer(customer);
        customerPolicy.setPolicy(policy);

        // Set policy details explicitly
        customerPolicy.setPolicyName(policy.getPolicyName());
        customerPolicy.setPolicyDuration(policy.getPolicyDuration());
        customerPolicy.setPolicyAmount(policy.getPolicyAmount());

        return customerPolicyRepository.save(customerPolicy);
    }

    public CustomerPolicy updatePolicyAction(Long policyNo, boolean action) {


        CustomerPolicy customerPolicy = customerPolicyRepository.findById(policyNo).orElseThrow();
        customerPolicy.setAction(action);
        return customerPolicyRepository.save(customerPolicy);
    }

    
}