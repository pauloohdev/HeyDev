import React from "react";
import { Settings, Star, Award, Code } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Card } from "@/app/components/ui/card";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";

interface ProfileProps {
  userType: "developer" | "company";
}

export function Profile({ userType }: ProfileProps) {
  // Simplified mock data - minimal example
  const developerData = {
    name: "João Silva",
    bio: "Desenvolvedor Full Stack com experiência em React e Node.js",
    rating: 4.9,
    completedServices: 47,
    skills: ["React", "Node.js", "TypeScript"],
    reviews: [
      {
        id: "1",
        company: "Tech Solutions",
        rating: 5,
        comment: "Excelente profissional, entrega rápida e código de qualidade!",
        date: "2 semanas atrás",
      },
    ],
  };

  const companyData = {
    name: "Tech Solutions",
    bio: "Empresa de tecnologia focada em soluções inovadoras",
    rating: 4.8,
    servicesPublished: 120,
    completedServices: 98,
  };

  const data = userType === "developer" ? developerData : companyData;

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-indigo-600 to-indigo-700 px-4 pt-6 pb-12">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-xl font-semibold text-white">Perfil</h1>
          <Button variant="ghost" size="icon" className="text-white hover:bg-indigo-500">
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Profile Picture and Name */}
        <div className="flex flex-col items-center text-center">
          <Avatar className="w-24 h-24 mb-4 border-4 border-white">
            <AvatarFallback className="text-2xl bg-indigo-500 text-white">
              {data.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-semibold text-white mb-1">{data.name}</h2>
          <div className="flex items-center gap-1 text-indigo-100">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{data.rating.toFixed(1)}</span>
            <span className="text-sm">• {data.completedServices} serviços completados</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 -mt-8 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">
              {userType === "developer" ? developerData.completedServices : companyData.completedServices}
            </div>
            <div className="text-xs text-gray-600">Completos</div>
          </div>
          <div className="text-center border-x border-gray-200">
            <div className="text-2xl font-semibold text-gray-900">
              {data.rating.toFixed(1)}
            </div>
            <div className="text-xs text-gray-600">Avaliação</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">
              {userType === "developer" ? "5" : "120"}
            </div>
            <div className="text-xs text-gray-600">
              {userType === "developer" ? "Anos exp." : "Publicados"}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-6">
        {/* Bio */}
        <Card className="p-4">
          <h3 className="font-medium text-gray-900 mb-2">Sobre</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{data.bio}</p>
        </Card>

        {/* Skills - Only for developers */}
        {userType === "developer" && (
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Code className="w-5 h-5 text-indigo-600" />
              <h3 className="font-medium text-gray-900">Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {developerData.skills.map((skill) => (
                <Badge key={skill} className="bg-indigo-50 text-indigo-700 border-indigo-200">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        )}

        {/* Reviews - Only for developers */}
        {userType === "developer" && (
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-indigo-600" />
              <h3 className="font-medium text-gray-900">Avaliações Recentes</h3>
            </div>
            <div className="space-y-4">
              {developerData.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-gray-900">{review.company}</div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{review.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Logout Button */}
        <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
          Sair da Conta
        </Button>
      </div>
    </div>
  );
}