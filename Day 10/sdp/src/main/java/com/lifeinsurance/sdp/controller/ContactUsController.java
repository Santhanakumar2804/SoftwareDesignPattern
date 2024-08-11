package com.lifeinsurance.sdp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lifeinsurance.sdp.model.ContactUs;
import com.lifeinsurance.sdp.service.ContactUsService;

@RestController
@RequestMapping("/api/contact")
public class ContactUsController {
    @Autowired
    private ContactUsService contactUsService;

    @PostMapping
    public ResponseEntity<ContactUs> contactUs(@RequestBody ContactUs contactUs) {
        ContactUs savedContactUs = contactUsService.save(contactUs);
        return new ResponseEntity<>(savedContactUs, HttpStatus.CREATED);
    }

    @GetMapping("/getinfo")
    public List<ContactUs> GetInfo()
    {
        return contactUsService.getDetails();
    }
}