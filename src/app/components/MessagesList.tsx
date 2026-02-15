import React from "react";
import { X, Search, MessageCircle } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";

interface MessagesListProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: (serviceId: string) => void;
  userType: "developer" | "company";
}

interface Conversation {
  id: string;
  serviceId: string;
  serviceName: string;
  partnerName: string;
  partnerType: "company" | "developer";
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export function MessagesList({ isOpen, onClose, onOpenChat, userType }: MessagesListProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const developerConversations: Conversation[] = [
    {
      id: "1",
      serviceId: "1",
      serviceName: "Implementar autenticação JWT",
      partnerName: "Tech Solutions",
      partnerType: "company",
      lastMessage: "Quando você pode começar o projeto?",
      lastMessageTime: "5 min",
      unreadCount: 2,
      isOnline: true,
    },
  ];

  const companyConversations: Conversation[] = [
    {
      id: "1",
      serviceId: "1",
      serviceName: "Implementar autenticação JWT",
      partnerName: "João Silva",
      partnerType: "developer",
      lastMessage: "Posso começar amanhã mesmo!",
      lastMessageTime: "10 min",
      unreadCount: 1,
      isOnline: true,
    },
  ];

  const conversations = userType === "developer" ? developerConversations : companyConversations;
  const filteredConversations = conversations.filter(
    (conv) =>
      conv.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

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
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Mensagens</h2>
                {totalUnread > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    {totalUnread} {totalUnread === 1 ? "não lida" : "não lidas"}
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

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar conversas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="font-medium text-gray-900 mb-2">
                  {searchQuery ? "Nenhum resultado" : "Nenhuma mensagem"}
                </h3>
                <p className="text-gray-600 text-sm">
                  {searchQuery
                    ? "Tente buscar por outro termo"
                    : "Suas conversas aparecerão aqui"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => {
                      onOpenChat(conversation.serviceId);
                      onClose();
                    }}
                    className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex gap-3">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-indigo-100 text-indigo-700 font-medium">
                            {conversation.partnerName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">
                              {conversation.partnerName}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {conversation.serviceName}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {conversation.lastMessageTime}
                            </span>
                            {conversation.unreadCount > 0 && (
                              <Badge className="h-5 min-w-[20px] flex items-center justify-center bg-indigo-600 text-white text-xs px-1.5 py-0">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p
                          className={`text-sm truncate ${
                            conversation.unreadCount > 0
                              ? "text-gray-900 font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}