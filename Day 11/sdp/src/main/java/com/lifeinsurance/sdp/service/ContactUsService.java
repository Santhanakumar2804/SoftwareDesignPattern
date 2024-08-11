package com.lifeinsurance.sdp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.lifeinsurance.sdp.model.ContactUs;
import com.lifeinsurance.sdp.repo.ContactUsRepository;

@Service
public class ContactUsService {
    @Autowired
    private ContactUsRepository contactUsRepository;

    public ContactUs save(ContactUs contactUs) {
        return contactUsRepository.save(contactUs);
    }

    
    public List<ContactUs> getDetails()
    {
        return contactUsRepository.findAll();
    }
}