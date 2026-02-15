import React from "react";
import { Bell, MessageCircle } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  notificationCount?: number;
  unreadMessagesCount?: number;
  onOpenNotifications: () => void;
  onOpenMessages: () => void;
}

export function AppHeader({
  title,
  subtitle,
  notificationCount = 0,
  unreadMessagesCount = 0,
  onOpenNotifications,
  onOpenMessages,
}: AppHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-20">
      <div className="flex items-start justify-between gap-3">
        {/* Title Section */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Chat Icon */}
          <button
            onClick={onOpenMessages}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Mensagens"
          >
            <MessageCircle className="w-6 h-6 text-gray-700" />
            {unreadMessagesCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 min-w-[20px] flex items-center justify-center bg-indigo-600 text-white text-xs px-1.5 py-0">
                {unreadMessagesCount > 99 ? "99+" : unreadMessagesCount}
              </Badge>
            )}
          </button>

          {/* Notifications Icon */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Notificações"
          >
            <Bell className="w-6 h-6 text-gray-700" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 min-w-[20px] flex items-center justify-center bg-red-500 text-white text-xs px-1.5 py-0">
                {notificationCount > 99 ? "99+" : notificationCount}
              </Badge>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
