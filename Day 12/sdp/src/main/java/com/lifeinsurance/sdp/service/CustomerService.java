package com.lifeinsurance.sdp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.lifeinsurance.sdp.model.Customer;
import com.lifeinsurance.sdp.repo.CustomerRepository;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public Customer findCustomerByEmail(String email) {
        return customerRepository.findByEmail(email).orElse(null);
    }

   
}