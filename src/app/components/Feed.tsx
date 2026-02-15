import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ServiceCard, Service } from "@/app/components/ServiceCard";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { AppHeader } from "@/app/components/AppHeader";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Slider } from "@/app/components/ui/slider";

interface FeedProps {
  onViewService: (service: Service) => void;
  onOpenNotifications: () => void;
  onOpenMessages: () => void;
}

export function Feed({ onViewService, onOpenNotifications, onOpenMessages }: FeedProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStacks, setSelectedStacks] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState([0, 15000]);

  // Simplified mock data - minimal example
  const services: Service[] = [
    {
      id: "1",
      title: "Implementar autenticação JWT em API Node",
      description: "Desenvolvimento de sistema completo de autenticação usando JWT",
      value: 3500,
      deadline: "5 dias",
      type: "Feature",
      level: "Pleno",
      stack: ["Node.js", "JWT", "Express"],
      company: "Tech Solutions",
      companyRating: 4.8,
    },
  ];

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = service.value >= priceRange[0] && service.value <= priceRange[1];
    return matchesSearch && matchesPrice;
  });

  const stacks = ["React", "Node.js", "React Native", "Python", "TypeScript", "GraphQL"];

  return (
    <div className="pb-20">
      {/* Header */}
      <AppHeader
        title="Feed de Serviços"
        notificationCount={0}
        unreadMessagesCount={0}
        onOpenNotifications={onOpenNotifications}
        onOpenMessages={onOpenMessages}
      />

      {/* Content */}
      <div className="p-4">
        {/* Search and Filter */}
        <div className="space-y-3 mb-4">
          {/* Info Banner */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-lg p-3">
            <p className="text-sm text-indigo-900">
              🔒 <strong>Como funciona:</strong> Solicite participar dos serviços e aguarde a aprovação da empresa. Isso garante segurança para ambas as partes!
            </p>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por tecnologia, tipo..."
                className="pl-10 h-11"
              />
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-11 px-4">
                  <SlidersHorizontal className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                
                <div className="mt-6 space-y-6">
                  {/* Stack Filter */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">Stack Tecnológica</Label>
                    <div className="space-y-2">
                      {stacks.map((stack) => (
                        <div key={stack} className="flex items-center space-x-2">
                          <Checkbox
                            id={stack}
                            checked={selectedStacks.includes(stack)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedStacks([...selectedStacks, stack]);
                              } else {
                                setSelectedStacks(selectedStacks.filter((s) => s !== stack));
                              }
                            }}
                          />
                          <label
                            htmlFor={stack}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {stack}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Value Range */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Faixa de Valor: R$ {priceRange[0]} - R$ {priceRange[1]}
                    </Label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={50000}
                      step={500}
                      className="mt-2"
                    />
                  </div>

                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    Aplicar Filtros
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="p-4 space-y-4">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onViewDetails={onViewService}
          />
        ))}
      </div>

      {/* Real-time indicator */}
      <div className="fixed top-20 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        Ao vivo
      </div>
    </div>
  );
}