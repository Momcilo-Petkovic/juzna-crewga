package com.juznacrewga.backend.contact;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    private final ContactMessageRepository repository;
    private final ObjectProvider<JavaMailSender> mailSender;
    private final String senderAddress;
    private final String recipient;

    public ContactService(
            ContactMessageRepository repository,
            ObjectProvider<JavaMailSender> mailSender,
            @Value("${spring.mail.username:}") String senderAddress,
            @Value("${app.contact.recipient}") String recipient
    ) {
        this.repository = repository;
        this.mailSender = mailSender;
        this.senderAddress = senderAddress;
        this.recipient = recipient;
    }

    public void handle(ContactRequest request) {
        if (request.website() != null && !request.website().isBlank()) {
            log.info("Ignored a contact message from a spam bot ({})", request.email());
            return;
        }

        String email = request.email().trim();
        String message = request.message().trim();
        repository.save(new ContactMessage(email, message));

        JavaMailSender sender = mailSender.getIfAvailable();
        if (senderAddress.isBlank() || sender == null) {
            log.info("Email is not configured: message from {} saved to the database only", email);
            return;
        }

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(senderAddress);
        mail.setTo(recipient);
        mail.setReplyTo(email); // pressing "Reply" in Gmail answers the visitor directly
        mail.setSubject("Nova poruka sa sajta: " + email);
        mail.setText("Od: " + email + "\n\n" + message);
        sender.send(mail);
    }
}
