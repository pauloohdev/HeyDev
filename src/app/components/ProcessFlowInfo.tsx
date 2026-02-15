import React from "react";
import { FileText, Eye, MessageCircle, CheckCircle } from "lucide-react";

export function ProcessFlowInfo() {
  const steps = [
    {
      icon: FileText,
      title: "Solicitação",
      description: "Dev envia solicitação",
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: Eye,
      title: "Análise",
      description: "Empresa avalia perfil",
      color: "text-purple-600 bg-purple-50",
    },
    {
      icon: MessageCircle,
      title: "Conversa",
      description: "Chat ou entrevista (opcional)",
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      icon: CheckCircle,
      title: "Aprovação",
      description: "Empresa aprova e inicia",
      color: "text-green-600 bg-green-50",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-5">
      <h3 className="text-sm font-medium text-gray-900 mb-4 text-center">
        Fluxo de Solicitação e Aprovação
      </h3>
      
      <div className="flex items-center justify-between gap-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.title}>
              <div className="flex-1 text-center">
                <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium text-gray-900">{step.title}</p>
                <p className="text-xs text-gray-500 mt-1">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="w-6 text-gray-300 text-xl font-bold mb-8">→</div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
