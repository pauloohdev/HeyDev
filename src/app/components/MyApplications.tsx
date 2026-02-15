import React from "react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Clock, CheckCircle, XCircle, MessageCircle, Eye } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { AppHeader } from "@/app/components/AppHeader";

interface MyApplicationsProps {
  onOpenChat: (serviceId: string) => void;
  onViewService: (serviceId: string) => void;
  onOpenNotifications: () => void;
  onOpenMessages: () => void;
}

type ApplicationStatus = "pending" | "analyzing" | "approved" | "rejected" | "in_progress";

interface Application {
  id: string;
  serviceId: string;
  serviceName: string;
  company: string;
  value: number;
  appliedAt: string;
  status: ApplicationStatus;
  hasUnreadMessages?: boolean;
}

export function MyApplications({ onOpenChat, onViewService, onOpenNotifications, onOpenMessages }: MyApplicationsProps) {
  // Simplified mock data - minimal example
  const applications: Application[] = [
    {
      id: "1",
      serviceId: "1",
      serviceName: "Implementar autenticação JWT em API Node",
      company: "Tech Solutions",
      value: 3500,
      appliedAt: "Há 2 horas",
      status: "analyzing",
      hasUnreadMessages: true,
    },
  ];

  const getStatusConfig = (status: ApplicationStatus) => {
    switch (status) {
      case "pending":
        return {
          label: "Enviada",
          color: "bg-gray-100 text-gray-700 border-gray-200",
          icon: Clock,
        };
      case "analyzing":
        return {
          label: "Em análise",
          color: "bg-blue-50 text-blue-700 border-blue-200",
          icon: Eye,
        };
      case "approved":
        return {
          label: "Aprovada",
          color: "bg-green-50 text-green-700 border-green-200",
          icon: CheckCircle,
        };
      case "rejected":
        return {
          label: "Não selecionado",
          color: "bg-red-50 text-red-700 border-red-200",
          icon: XCircle,
        };
      case "in_progress":
        return {
          label: "Em progresso",
          color: "bg-yellow-50 text-yellow-700 border-yellow-200",
          icon: MessageCircle,
        };
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <AppHeader
        title="Minhas Solicitações"
        subtitle="Acompanhe o status das suas candidaturas"
        notificationCount={0}
        unreadMessagesCount={0}
        onOpenNotifications={onOpenNotifications}
        onOpenMessages={onOpenMessages}
      />

      {/* Applications List */}
      <div className="p-4 space-y-4">
        {applications.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="font-medium text-gray-900 mb-2">
              Nenhuma solicitação ainda
            </h3>
            <p className="text-gray-600 text-sm">
              Explore o feed e solicite participar dos serviços
            </p>
          </div>
        ) : (
          applications.map((app) => {
            const statusConfig = getStatusConfig(app.status);
            const StatusIcon = statusConfig.icon;

            return (
              <Card key={app.id} className="p-4">
                <div className="space-y-3">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={statusConfig.color}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig.label}
                    </Badge>
                    <span className="text-xs text-gray-500">{app.appliedAt}</span>
                  </div>

                  {/* Service Info */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      {app.serviceName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{app.company}</span>
                    </div>
                  </div>

                  {/* Value */}
                  <div className="text-lg font-semibold text-indigo-600">
                    R$ {app.value.toLocaleString()}
                  </div>

                  {/* Message */}
                  {app.hasUnreadMessages && (
                    <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
                      <p className="text-sm text-purple-900">Você tem mensagens não lidas!</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    {app.status === "analyzing" && (
                      <Button
                        onClick={() => onOpenChat(app.serviceId)}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Abrir conversa
                      </Button>
                    )}
                    {app.status !== "rejected" && (
                      <Button
                        onClick={() => onViewService(app.serviceId)}
                        variant="outline"
                        className={app.status === "analyzing" ? "" : "flex-1"}
                      >
                        Ver serviço
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}