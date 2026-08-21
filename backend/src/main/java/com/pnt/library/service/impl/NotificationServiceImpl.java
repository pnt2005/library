package com.pnt.library.service.impl;

import com.pnt.library.exception.ResourceNotFoundException;
import com.pnt.library.model.entity.NotificationEntity;
import com.pnt.library.model.entity.UserEntity;
import com.pnt.library.repository.NotificationRepository;
import com.pnt.library.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private Map<Long, SseEmitter> emitterMap = new ConcurrentHashMap<>();

    @Override
    public void markAsRead(Long id) {
        NotificationEntity notificationEntity = notificationRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("notification not found"));
        notificationEntity.setRead(true);
    }

    @Override
    public SseEmitter subscribe(Long readerId) {
        SseEmitter emitter = new SseEmitter(0L);
        emitterMap.put(readerId, emitter);
        emitter.onCompletion(() -> emitterMap.remove(readerId));
        emitter.onTimeout(() -> emitterMap.remove(readerId));
        emitter.onError(e -> emitterMap.remove(readerId));
        return emitter;
    }

    @Override
    public void createAndSend(UserEntity user, String message) {
        NotificationEntity notificationEntity = new NotificationEntity();
        notificationEntity.setUserEntity(user);
        notificationEntity.setMessage(message);
        notificationEntity.setRead(false);
        notificationRepository.save(notificationEntity);
        sendNotification(user.getId(), notificationEntity);
    }

    private void sendNotification(Long readerId, NotificationEntity notificationEntity) {
        SseEmitter emitter = emitterMap.get(readerId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .name("notification").
                        data(notificationEntity));
            } catch (IOException e) {
                emitterMap.remove(readerId);
            }
        }
    }
}
