import React from "react";
import { Star, MessageCircle, UserCheck, X, Eye } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";

export interface Candidate {
  id: string;
  name: string;
  rating: number;
  completedServices: number;
  skills: string[];
  message?: string;
  appliedAt: string;
}

interface CandidateCardProps {
  candidate: Candidate;
  onViewProfile: (candidateId: string) => void;
  onStartChat: (candidateId: string) => void;
  onApprove: (candidateId: string) => void;
  onReject: (candidateId: string) => void;
}

export function CandidateCard({
  candidate,
  onViewProfile,
  onStartChat,
  onApprove,
  onReject,
}: CandidateCardProps) {
  const [showActions, setShowActions] = React.useState(true);

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-indigo-100 text-indigo-700">
              {candidate.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{candidate.name}</h3>
            <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{candidate.rating.toFixed(1)}</span>
              </div>
              <span>•</span>
              <span>{candidate.completedServices} serviços</span>
            </div>
          </div>

          <span className="text-xs text-gray-500">{candidate.appliedAt}</span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {candidate.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className="bg-gray-50 text-gray-700 text-xs">
              {skill}
            </Badge>
          ))}
          {candidate.skills.length > 4 && (
            <Badge variant="outline" className="bg-gray-50 text-gray-700 text-xs">
              +{candidate.skills.length - 4}
            </Badge>
          )}
        </div>

        {/* Message from candidate */}
        {candidate.message && (
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
            <p className="text-sm text-gray-700 italic">"{candidate.message}"</p>
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => onViewProfile(candidate.id)}
                className="w-full"
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver perfil
              </Button>
              <Button
                variant="outline"
                onClick={() => onStartChat(candidate.id)}
                className="w-full"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Conversar
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  onReject(candidate.id);
                  setShowActions(false);
                }}
                className="w-full border-red-200 text-red-600 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-2" />
                Recusar
              </Button>
              <Button
                onClick={() => {
                  onApprove(candidate.id);
                  setShowActions(false);
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <UserCheck className="w-4 h-4 mr-2" />
                Aprovar
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
