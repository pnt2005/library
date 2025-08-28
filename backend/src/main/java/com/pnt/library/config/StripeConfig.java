package com.pnt.library.config;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StripeConfig {
    @PostConstruct
    public void init() {
        Stripe.apiKey = "sk_test_51S029qFZzQxfehlU0IvD9uzeHlWmCaHSDj8v3UK1jfGWh1uVYDK5WQYNU8iJPoyapqbadhAHYpITnlCe0mFR4VXv00xx6qnp8A";
    }
}
