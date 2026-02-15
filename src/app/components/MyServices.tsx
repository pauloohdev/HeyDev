import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { MessageCircle, Clock, CheckCircle, Users, Eye, DollarSign } from "lucide-react";
import { AppHeader } from "@/app/components/AppHeader";

interface MyServicesProps {
  onOpenChat: (serviceId: string) => void;
  onViewCandidates?: (serviceId: string) => void;
  userType: "developer" | "company";
  onOpenNotifications: () => void;
  onOpenMessages: () => void;
}

export function MyServices({ onOpenChat, onViewCandidates, userType, onOpenNotifications, onOpenMessages }: MyServicesProps) {
  type ServiceStatus = "waiting" | "in_progress" | "completed";

  interface Service {
    id: string;
    title: string;
    value: number;
    deadline: string;
    status: ServiceStatus;
    candidates?: number;
    hasUnreadMessages?: boolean;
    progress?: number;
    developerName?: string;
  }

  // Simplified mock data - minimal examples
  const developerServices: Service[] = [
    {
      id: "1",
      title: "Dashboard analítico com gráficos",
      value: 4500,
      deadline: "7 dias",
      status: "in_progress",
      hasUnreadMessages: false,
      progress: 60,
    },
  ];

  const companyServices: Service[] = [
    {
      id: "1",
      title: "Implementar autenticação JWT em API Node",
      value: 3500,
      deadline: "5 dias",
      status: "waiting",
      candidates: 3,
    },
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <AppHeader
        title="Meus Serviços"
        notificationCount={0}
        unreadMessagesCount={0}
        onOpenNotifications={onOpenNotifications}
        onOpenMessages={onOpenMessages}
      />

      {/* Tabs */}
      <Tabs defaultValue="active" className="p-4">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="active">Ativos</TabsTrigger>
          <TabsTrigger value="completed">Finalizados</TabsTrigger>
        </TabsList>

        {/* Active Services */}
        <TabsContent value="active" className="space-y-4 mt-0">
          {userType === "developer"
            ? developerServices.map((service) => (
                <Card key={service.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{service.title}</h3>
                        <p className="text-sm text-gray-600">R$ {service.value.toLocaleString()}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          service.status === "in_progress"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }
                      >
                        {service.status === "in_progress" ? "Em progresso" : "Aguardando início"}
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    {service.progress > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Progresso</span>
                          <span>{service.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full transition-all"
                            style={{ width: `${service.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {service.deadline}
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => onOpenChat(service.id)}
                      variant="outline"
                      className="w-full"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Abrir chat
                    </Button>
                  </div>
                </Card>
              ))
            : companyServices.map((service) => (
                <Card key={service.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900 flex-1">{service.title}</h3>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Ativo
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-medium text-gray-900">
                          R$ {service.value.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{service.deadline}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-indigo-600">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">{service.candidates} candidatos</span>
                      </div>
                    </div>

                    {service.candidates > 0 && onViewCandidates && (
                      <Button
                        onClick={() => onViewCandidates(service.id)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                      >
                        Ver candidatos ({service.candidates})
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
        </TabsContent>

        {/* Completed Services */}
        <TabsContent value="completed" className="space-y-4 mt-0">
          {userType === "developer"
            ? developerServices.map((service) => (
                <Card key={service.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{service.title}</h3>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                        <p className="text-sm text-gray-600">R$ {service.value.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <span>⭐ 5.0</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">Concluído {service.completedAt}</div>
                  </div>
                </Card>
              ))
            : companyServices.map((service) => (
                <Card key={service.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{service.title}</h3>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                        <p className="text-sm text-gray-600">Desenvolvedor: {service.developerName}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-900">R$ {service.value}</span>
                      <div className="flex items-center gap-1 text-gray-600">
                        <span>⭐ 5.0</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">Concluído {service.completedAt}</div>
                  </div>
                </Card>
              ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}