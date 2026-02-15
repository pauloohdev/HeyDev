import { Clock, DollarSign, TrendingUp, Zap } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

export interface Service {
  id: string;
  title: string;
  description: string;
  value: number;
  deadline: string;
  type: "Bug" | "Feature" | "Projeto";
  level: "Júnior" | "Pleno" | "Sênior";
  stack: string[];
  company: string;
  companyRating: number;
  isNew?: boolean;
  highDemand?: boolean;
  urgent?: boolean;
}

interface ServiceCardProps {
  service: Service;
  onViewDetails: (service: Service) => void;
}

export function ServiceCard({ service, onViewDetails }: ServiceCardProps) {
  return (
    <Card className="p-4 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-3">
        {/* Badges de status */}
        <div className="flex gap-2 flex-wrap">
          {service.isNew && (
            <Badge className="bg-blue-50 text-blue-600 border-blue-100">
              <Zap className="w-3 h-3 mr-1" />
              Novo
            </Badge>
          )}
          {service.highDemand && (
            <Badge className="bg-purple-50 text-purple-600 border-purple-100">
              <TrendingUp className="w-3 h-3 mr-1" />
              Alta demanda
            </Badge>
          )}
          {service.urgent && (
            <Badge className="bg-orange-50 text-orange-600 border-orange-100">
              <Clock className="w-3 h-3 mr-1" />
              Urgente
            </Badge>
          )}
        </div>

        {/* Título e descrição */}
        <div>
          <h3 className="font-medium text-gray-900 mb-1">{service.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
        </div>

        {/* Stack */}
        <div className="flex gap-2 flex-wrap">
          {service.stack.map((tech) => (
            <Badge key={tech} variant="outline" className="bg-gray-50 text-gray-700 text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Informações */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span className="font-medium text-gray-900">R$ {service.value.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{service.deadline}</span>
          </div>
        </div>

        {/* Tipo e Nível */}
        <div className="flex gap-2">
          <Badge variant="outline" className="text-xs">{service.type}</Badge>
          <Badge variant="outline" className="text-xs">{service.level}</Badge>
        </div>

        {/* Empresa */}
        <div className="text-xs text-gray-500">
          {service.company} • ⭐ {service.companyRating.toFixed(1)}
        </div>

        {/* Botão */}
        <Button 
          onClick={() => onViewDetails(service)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Ver detalhes
        </Button>
      </div>
    </Card>
  );
}
