'use client'

import React, { useEffect, useState, useRef } from 'react';
import { Bell } from 'lucide-react';
import Cookies from 'js-cookie';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { markNotificationAsRead } from '@/utils/api/notification';

export interface Notification {
  id: number;
  message: string;
  read: boolean;
}

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Click outside → close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // SSE connection
  useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token) return;

    const controller = new AbortController();
    controllerRef.current = controller;

    fetchEventSource('http://localhost:8080/notifications/subscribe', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
      openWhenHidden: true,

      onopen: async (res) => {
        if (res.ok && res.headers.get('content-type')?.includes('text/event-stream')) {
          console.log('[Notification] SSE connected successfully');
          return;
        }
        // Bất kỳ lỗi nào (401, 500...) → dừng kết nối
        console.error('[Notification] SSE failed to open, status:', res.status);
        throw new Error(`SSE open failed: ${res.status}`);
      },

      onmessage(ev) {
        if (ev.event === 'notification') {
          try {
            const data = JSON.parse(ev.data);
            setNotifications(prev => [data, ...prev]);
          } catch (err) {
            console.error('[Notification] Failed to parse SSE data', err);
          }
        }
      },

      onerror(err) {
        console.error('[Notification] SSE error:', err);
        // Dừng retry - không để fetchEventSource tự reconnect vô hạn
        throw err;
      },
    });

    return () => {
      controller.abort();
    };
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error('[Notification] Mark-as-read failed', err);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-gray-500">
                No new notifications
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {notifications.map(notification => (
                  <li
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-50 transition ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <p className={`text-sm ${!notification.read ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                        {notification.message}
                      </p>
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="ml-2 text-xs text-blue-600 hover:text-blue-800 whitespace-nowrap"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
