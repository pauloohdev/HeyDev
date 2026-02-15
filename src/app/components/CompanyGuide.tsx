import React from "react";
import { Users, MessageCircle, UserCheck, XCircle } from "lucide-react";
import { Card } from "@/app/components/ui/card";

export function CompanyGuide() {
  const actions = [
    {
      icon: Users,
      title: "Ver Perfil",
      description: "Analise experiência e avaliações",
      color: "text-blue-600",
    },
    {
      icon: MessageCircle,
      title: "Conversar",
      description: "Chat para tirar dúvidas",
      color: "text-purple-600",
    },
    {
      icon: UserCheck,
      title: "Aprovar",
      description: "Aprove e inicie o serviço",
      color: "text-green-600",
    },
    {
      icon: XCircle,
      title: "Recusar",
      description: "Recuse se não atender",
      color: "text-red-600",
    },
  ];

  return (
    <Card className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
      <h3 className="text-sm font-medium text-indigo-900 mb-4">
        💼 Como Avaliar Candidatos
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <div key={action.title} className="bg-white rounded-lg p-3">
              <Icon className={`w-5 h-5 ${action.color} mb-2`} />
              <p className="text-xs font-medium text-gray-900 mb-1">{action.title}</p>
              <p className="text-xs text-gray-600 leading-tight">{action.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 bg-white rounded-lg p-3">
        <p className="text-xs text-gray-700">
          <strong>✅ Dica:</strong> Quanto mais clara sua comunicação, melhores os resultados. Não hesite em fazer perguntas!
        </p>
      </div>
    </Card>
  );
}