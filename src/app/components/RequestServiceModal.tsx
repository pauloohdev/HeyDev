import React from "react";
import { X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";

interface RequestServiceModalProps {
  isOpen: boolean;
  serviceName: string;
  companyName: string;
  onClose: () => void;
  onSubmit: (message: string) => void;
}

export function RequestServiceModal({
  isOpen,
  serviceName,
  companyName,
  onClose,
  onSubmit,
}: RequestServiceModalProps) {
  const [message, setMessage] = React.useState("");

  const handleSubmit = () => {
    onSubmit(message);
    setMessage("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Solicitar Serviço</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Service Info */}
          <div className="bg-indigo-50 rounded-lg p-4">
            <p className="text-sm text-indigo-600 mb-1">Serviço</p>
            <p className="font-medium text-gray-900">{serviceName}</p>
            <p className="text-sm text-gray-600 mt-2">{companyName}</p>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message" className="text-gray-900 mb-2 block">
              Mensagem para a empresa (opcional)
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ex: Tenho 3 anos de experiência com Node.js e já implementei autenticação JWT em diversos projetos..."
              className="min-h-[120px] resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Uma mensagem personalizada aumenta suas chances de aprovação
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <p className="text-sm text-blue-900">
              ℹ️ Sua solicitação será enviada para análise. A empresa poderá visualizar seu perfil e decidir iniciar uma conversa ou aprovar sua participação.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Enviar Solicitação
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
