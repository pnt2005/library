package com.pnt.library.service;

import com.pnt.library.model.entity.ReaderEntity;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NotificationService {
    void markAsRead(Long id);

    SseEmitter subscribe(Long readerId);

    void createAndSend(ReaderEntity reader, String message);
}
