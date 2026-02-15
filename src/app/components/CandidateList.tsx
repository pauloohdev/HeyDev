import React from "react";
import { ArrowLeft, Users } from "lucide-react";
import { CandidateCard, Candidate } from "@/app/components/CandidateCard";
import { CompanyGuide } from "@/app/components/CompanyGuide";
import { toast } from "sonner";
import { Badge } from "@/app/components/ui/badge";

interface CandidateListProps {
  serviceName: string;
  onBack: () => void;
  onOpenChat: (candidateId: string) => void;
}

export function CandidateList({ serviceName, onBack, onOpenChat }: CandidateListProps) {
  // Simplified mock data - minimal example
  const candidates: Candidate[] = [
    {
      id: "1",
      name: "João Silva",
      rating: 4.9,
      completedServices: 47,
      skills: ["React", "Node.js", "TypeScript"],
      message: "Tenho experiência com Node.js e já implementei autenticação JWT em diversos projetos.",
      appliedAt: "2h atrás",
    },
  ];

  const handleViewProfile = (candidateId: string) => {
    toast.info("Visualizando perfil completo...");
    // Navigate to profile view
  };

  const handleStartChat = (candidateId: string) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      toast.success(`Conversa iniciada com ${candidate.name}`);
      onOpenChat(candidateId);
    }
  };

  const handleApprove = (candidateId: string) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      toast.success(`${candidate.name} foi aprovado! O serviço foi iniciado.`);
    }
  };

  const handleReject = (candidateId: string) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      toast.info(`Solicitação de ${candidate.name} foi recusada.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </button>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-900 mb-1">
              Candidatos
            </h1>
            <p className="text-sm text-gray-600 line-clamp-2">{serviceName}</p>
          </div>
          <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">
            <Users className="w-3 h-3 mr-1" />
            {candidates.length}
          </Badge>
        </div>
      </div>

      {/* Info Banner */}
      <div className="px-4 pt-4 space-y-4">
        <CompanyGuide />
      </div>

      {/* Candidates */}
      <div className="p-4 space-y-4">
        {candidates.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="font-medium text-gray-900 mb-2">
              Nenhum candidato ainda
            </h3>
            <p className="text-gray-600 text-sm">
              Assim que desenvolvedores solicitarem participar, eles aparecerão aqui
            </p>
          </div>
        ) : (
          candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onViewProfile={handleViewProfile}
              onStartChat={handleStartChat}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))
        )}
      </div>
    </div>
  );
}