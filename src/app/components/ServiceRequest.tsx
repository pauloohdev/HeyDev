import React from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface ServiceRequestProps {
  serviceName: string;
  onContinue: () => void;
}

export function ServiceRequest({ serviceName, onContinue }: ServiceRequestProps) {
  const [status, setStatus] = React.useState<"loading" | "success">("loading");

  React.useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setStatus("success");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Enviando solicitação...
          </h2>
          <p className="text-gray-600">
            Aguarde enquanto enviamos sua solicitação
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Success Animation */}
        <div className="mb-6 relative">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto animate-in zoom-in duration-500">
            <CheckCircle className="w-12 h-12 text-indigo-600" />
          </div>
          <div className="absolute inset-0 w-24 h-24 bg-indigo-200 rounded-full mx-auto animate-ping opacity-25"></div>
        </div>

        <h2 className="text-3xl font-semibold text-gray-900 mb-3">
          Solicitação enviada! 🎯
        </h2>
        
        <p className="text-gray-600 mb-2">
          Você solicitou participar do serviço:
        </p>
        
        <p className="text-lg font-medium text-indigo-600 mb-6">
          "{serviceName}"
        </p>

        <div className="bg-white rounded-lg p-5 mb-6 text-left space-y-3 shadow-sm">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Próximos passos:</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-gray-700 ml-8">
            <li>1. A empresa foi notificada da sua solicitação</li>
            <li>2. Seu perfil será analisado</li>
            <li>3. A empresa pode iniciar uma conversa ou aprovar diretamente</li>
            <li>4. Você receberá atualizações em tempo real</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-blue-900">
            💡 <strong>Dica:</strong> Mantenha seu perfil atualizado e responda rapidamente se a empresa entrar em contato!
          </p>
        </div>

        <Button
          onClick={onContinue}
          className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Ver Minhas Solicitações
        </Button>
      </div>
    </div>
  );
}
