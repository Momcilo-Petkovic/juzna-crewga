package com.juznacrewga.backend.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * What the contact form sends.
 * {@code website} is a honeypot: a hidden field real visitors never fill in, but spam bots do.
 */
public record ContactRequest(
        @NotBlank @Email @Size(max = 254) String email,
        @NotBlank @Size(max = 5000) String message,
        String website
) {
}
