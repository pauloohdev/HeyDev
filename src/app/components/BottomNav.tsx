import { Home, Briefcase, PlusCircle, User, ClipboardList } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userType: "developer" | "company";
}

export function BottomNav({ activeTab, onTabChange, userType }: BottomNavProps) {
  const developerTabs = [
    { id: "feed", label: "Feed", icon: Home },
    { id: "applications", label: "Solicitações", icon: ClipboardList },
    { id: "my-services", label: "Serviços", icon: Briefcase },
    { id: "profile", label: "Perfil", icon: User },
  ];

  const companyTabs = [
    { id: "feed", label: "Feed", icon: Home },
    { id: "my-services", label: "Serviços", icon: Briefcase },
    { id: "create", label: "Criar", icon: PlusCircle },
    { id: "profile", label: "Perfil", icon: User },
  ];

  const tabs = userType === "developer" ? developerTabs : companyTabs;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
                  isActive ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}