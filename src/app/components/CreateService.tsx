import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Badge } from "@/app/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface CreateServiceProps {
  onBack: () => void;
  onPublish: () => void;
}

export function CreateService({ onBack, onPublish }: CreateServiceProps) {
  const [selectedStacks, setSelectedStacks] = React.useState<string[]>([]);
  const availableStacks = [
    "React",
    "Node.js",
    "Python",
    "TypeScript",
    "PostgreSQL",
    "MongoDB",
    "React Native",
    "Vue.js",
    "Django",
    "GraphQL",
  ];

  const toggleStack = (stack: string) => {
    if (selectedStacks.includes(stack)) {
      setSelectedStacks(selectedStacks.filter((s) => s !== stack));
    } else {
      setSelectedStacks([...selectedStacks, stack]);
    }
  };

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
        <h1 className="text-2xl font-semibold text-gray-900">Criar Serviço</h1>
        <p className="text-sm text-gray-600 mt-1">Publique sua demanda e encontre o dev ideal</p>
      </div>

      {/* Form */}
      <div className="p-4 space-y-5">
        {/* Title */}
        <div>
          <Label htmlFor="title" className="text-gray-900 mb-2 block">
            Título do Serviço *
          </Label>
          <Input
            id="title"
            placeholder="Ex: Implementar autenticação JWT em API Node"
            className="h-12"
          />
          <p className="text-xs text-gray-500 mt-1">
            Seja claro e objetivo sobre o que precisa
          </p>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-gray-900 mb-2 block">
            Descrição *
          </Label>
          <Textarea
            id="description"
            placeholder="Descreva em detalhes o que precisa ser desenvolvido..."
            className="min-h-[120px] resize-none"
          />
        </div>

        {/* Stack Selection */}
        <div>
          <Label className="text-gray-900 mb-2 block">Stack Tecnológica *</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {availableStacks.map((stack) => (
              <Badge
                key={stack}
                variant="outline"
                className={`cursor-pointer transition-colors ${
                  selectedStacks.includes(stack)
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => toggleStack(stack)}
              >
                {stack}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            Selecione as tecnologias necessárias
          </p>
        </div>

        {/* Type and Level */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="type" className="text-gray-900 mb-2 block">
              Tipo *
            </Label>
            <Select>
              <SelectTrigger id="type" className="h-12">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bug">Bug</SelectItem>
                <SelectItem value="feature">Feature</SelectItem>
                <SelectItem value="projeto">Projeto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="level" className="text-gray-900 mb-2 block">
              Nível *
            </Label>
            <Select>
              <SelectTrigger id="level" className="h-12">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Júnior</SelectItem>
                <SelectItem value="pleno">Pleno</SelectItem>
                <SelectItem value="senior">Sênior</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Value and Deadline */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="value" className="text-gray-900 mb-2 block">
              Valor (R$) *
            </Label>
            <Input
              id="value"
              type="number"
              placeholder="0"
              className="h-12"
            />
          </div>

          <div>
            <Label htmlFor="deadline" className="text-gray-900 mb-2 block">
              Prazo *
            </Label>
            <Input
              id="deadline"
              placeholder="Ex: 5 dias"
              className="h-12"
            />
          </div>
        </div>

        {/* Help text */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
          <p className="text-sm text-indigo-900">
            💡 <strong>Dica:</strong> Serviços com descrições claras e valores justos
            são aceitos 3x mais rápido!
          </p>
        </div>
      </div>

      {/* Fixed Publish Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          <Button
            onClick={onPublish}
            className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white text-lg"
          >
            Publicar Serviço
          </Button>
        </div>
      </div>
    </div>
  );
}
