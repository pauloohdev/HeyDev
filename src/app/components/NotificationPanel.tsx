import React from "react";
import { X, CheckCircle, MessageCircle, UserCheck, XCircle, Clock, Eye } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  userType: "developer" | "company";
  onNotificationClick?: (notificationId: string, type: string) => void;
}

type NotificationType = "application_update" | "new_message" | "service_completed" | "new_application" | "approval" | "rejection";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionData?: any;
}

export function NotificationPanel({ isOpen, onClose, userType, onNotificationClick }: NotificationPanelProps) {
  const developerNotifications: Notification[] = [
    {
      id: "1",
      type: "application_update",
      title: "Solicitação aprovada! 🎉",
      message: "Sua solicitação para 'Dashboard analítico' foi aprovada",
      time: "1 hora atrás",
      read: false,
    },
  ];

  const companyNotifications: Notification[] = [
    {
      id: "1",
      type: "new_application",
      title: "Novo candidato! 👤",
      message: "João Silva se candidatou para 'Implementar autenticação JWT'",
      time: "10 min atrás",
      read: false,
    },
  ];

  const notifications = userType === "developer" ? developerNotifications : companyNotifications;
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "new_message":
        return <MessageCircle className="w-5 h-5 text-indigo-600" />;
      case "application_update":
        return <Eye className="w-5 h-5 text-purple-600" />;
      case "approval":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "rejection":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "new_application":
        return <UserCheck className="w-5 h-5 text-blue-600" />;
      case "service_completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (onNotificationClick) {
      onNotificationClick(notification.id, notification.type);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Notificações</h2>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  {unreadCount} {unreadCount === 1 ? "não lida" : "não lidas"}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="text-6xl mb-4">🔔</div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Nenhuma notificação
                </h3>
                <p className="text-gray-600 text-sm">
                  Você está em dia com tudo!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                      !notification.read ? "bg-indigo-50/50" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-medium text-gray-900 text-sm">
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  // Mark all as read
                  onClose();
                }}
              >
                Marcar todas como lidas
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}