package com.pnt.library.controller;

import com.pnt.library.model.entity.ReaderEntity;
import com.pnt.library.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @PatchMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/subscribe")
    public ResponseEntity<SseEmitter> subscribe(@AuthenticationPrincipal ReaderEntity reader) {
        return ResponseEntity.ok().body(notificationService.subscribe(reader.getId()));
    }
}
