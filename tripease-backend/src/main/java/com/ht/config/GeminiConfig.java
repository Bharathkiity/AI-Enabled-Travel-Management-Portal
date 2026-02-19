package com.ht.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class GeminiConfig {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Bean
    public WebClient geminiWebClient() {
        return WebClient.builder()
                .baseUrl(geminiApiUrl)
                .defaultHeader("Content-Type", "application/json")
                .defaultHeader("x-goog-api-key", geminiApiKey)
                .build();
    }
}