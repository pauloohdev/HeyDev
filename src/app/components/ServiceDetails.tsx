import React from "react";
import { ArrowLeft, Clock, DollarSign, Building2, Star, CheckCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Service } from "@/app/components/ServiceCard";

interface ServiceDetailsProps {
  service: Service;
  onBack: () => void;
  onRequestService: (serviceId: string) => void;
}

export function ServiceDetails({ service, onBack, onRequestService }: ServiceDetailsProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </button>
        <h1 className="text-xl font-semibold text-gray-900">{service.title}</h1>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Main Info Card */}
        <div className="bg-white rounded-lg p-5 space-y-4">
          {/* Value and Deadline - Highlighted */}
          <div className="bg-indigo-50 rounded-lg p-4 flex justify-between items-center">
            <div>
              <div className="text-sm text-indigo-600 mb-1">Valor do Serviço</div>
              <div className="text-2xl font-semibold text-indigo-900">
                R$ {service.value.toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-indigo-600 mb-1">Prazo</div>
              <div className="text-xl font-semibold text-indigo-900">{service.deadline}</div>
            </div>
          </div>

          {/* Type and Level */}
          <div className="flex gap-2">
            <Badge variant="outline">{service.type}</Badge>
            <Badge variant="outline">{service.level}</Badge>
          </div>

          {/* Stack */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Stack Tecnológica</h3>
            <div className="flex gap-2 flex-wrap">
              {service.stack.map((tech) => (
                <Badge key={tech} className="bg-gray-100 text-gray-700">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg p-5">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Descrição Completa</h3>
          <p className="text-gray-700 leading-relaxed">{service.description}</p>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-lg p-5">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Requisitos Técnicos</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Experiência comprovada com as tecnologias listadas</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Código limpo e bem documentado</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Testes unitários incluídos</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Disponibilidade para reuniões de alinhamento</span>
            </li>
          </ul>
        </div>

        {/* Deliverables */}
        <div className="bg-white rounded-lg p-5">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Entregáveis Esperados</h3>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li>Código fonte completo</li>
            <li>Documentação técnica</li>
            <li>Instruções de deploy</li>
            <li>Suporte pós-entrega (15 dias)</li>
          </ul>
        </div>

        {/* Company Info */}
        <div className="bg-white rounded-lg p-5">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Sobre a Empresa</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">{service.company}</div>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
                {service.companyRating.toFixed(1)} • 47 serviços completados
              </div>
            </div>
          </div>
        </div>

        {/* Process Info */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-lg p-5">
          <h3 className="text-sm font-medium text-indigo-900 mb-3">🔒 Processo de Solicitação</h3>
          <div className="space-y-2 text-sm text-indigo-800">
            <div className="flex items-start gap-2">
              <span className="font-semibold">1.</span>
              <span>Você envia uma solicitação (com mensagem opcional)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">2.</span>
              <span>A empresa analisa seu perfil e experiência</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">3.</span>
              <span>A empresa pode iniciar uma conversa ou aprovar diretamente</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">4.</span>
              <span>Após aprovação, o serviço é iniciado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Request Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          <Button
            onClick={() => onRequestService(service.id)}
            className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white text-lg"
          >
            Solicitar Serviço
          </Button>
        </div>
      </div>
    </div>
  );
}