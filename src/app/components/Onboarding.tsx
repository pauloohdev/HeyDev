import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface OnboardingProps {
  onSelectType: (type: "developer" | "company") => void;
}

export function Onboarding({ onSelectType }: OnboardingProps) {
  const slides = [
    {
      title: "Conecte empresas e devs",
      description: "Plataforma on-demand para serviços técnicos",
      emoji: "🚀",
    },
    {
      title: "Sistema de aprovação",
      description: "Segurança e confiança para ambas as partes",
      emoji: "🔒",
    },
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [showTypeSelection, setShowTypeSelection] = React.useState(false);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowTypeSelection(true);
    }
  };

  if (showTypeSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">Bem-vindo!</h2>
            <p className="text-gray-600">Como você deseja usar o aplicativo?</p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => onSelectType("developer")}
              className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white text-lg"
            >
              <span className="mr-2">👨‍💻</span>
              Sou Desenvolvedor
            </Button>

            <Button
              onClick={() => onSelectType("company")}
              variant="outline"
              className="w-full h-16 border-2 border-indigo-200 hover:bg-indigo-50 text-lg"
            >
              <span className="mr-2">🏢</span>
              Sou Empresa
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Slides */}
        <div className="text-center space-y-6 mb-12">
          <div className="text-7xl mb-4">{slides[currentSlide].emoji}</div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {slides[currentSlide].title}
          </h2>
          <p className="text-gray-600">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-indigo-600"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <Button
          onClick={nextSlide}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12"
        >
          {currentSlide === slides.length - 1 ? "Começar" : "Próximo"}
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}