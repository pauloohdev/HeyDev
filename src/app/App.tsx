import React from "react";
import { Onboarding } from "@/app/components/Onboarding";
import { Login } from "@/app/components/Login";
import { Feed } from "@/app/components/Feed";
import { ServiceDetails } from "@/app/components/ServiceDetails";
import { RequestServiceModal } from "@/app/components/RequestServiceModal";
import { ServiceRequest } from "@/app/components/ServiceRequest";
import { MyServices } from "@/app/components/MyServices";
import { MyApplications } from "@/app/components/MyApplications";
import { CandidateList } from "@/app/components/CandidateList";
import { Chat } from "@/app/components/Chat";
import { CreateService } from "@/app/components/CreateService";
import { Profile } from "@/app/components/Profile";
import { BottomNav } from "@/app/components/BottomNav";
import { NotificationPanel } from "@/app/components/NotificationPanel";
import { MessagesList } from "@/app/components/MessagesList";
import { Service } from "@/app/components/ServiceCard";
import { Toaster } from "@/app/components/ui/sonner";
import { toast } from "sonner";

type Screen =
  | "onboarding"
  | "login"
  | "feed"
  | "service-details"
  | "service-request"
  | "applications"
  | "my-services"
  | "candidates"
  | "chat"
  | "create-service"
  | "profile";

export default function App() {
  const [currentScreen, setCurrentScreen] = React.useState<Screen>("onboarding");
  const [userType, setUserType] = React.useState<"developer" | "company">("developer");
  const [activeTab, setActiveTab] = React.useState("feed");
  const [selectedService, setSelectedService] = React.useState<Service | null>(null);
  const [showRequestModal, setShowRequestModal] = React.useState(false);
  const [chatServiceId, setChatServiceId] = React.useState<string | null>(null);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showMessages, setShowMessages] = React.useState(false);

  // Handle user type selection from onboarding
  const handleSelectUserType = (type: "developer" | "company") => {
    setUserType(type);
    setCurrentScreen("login");
  };

  // Handle login
  const handleLogin = () => {
    setCurrentScreen("feed");
    toast.success("Login realizado com sucesso!");
  };

  // Handle viewing service details
  const handleViewService = (service: Service) => {
    setSelectedService(service);
    setCurrentScreen("service-details");
  };

  // Handle requesting service (from details)
  const handleRequestService = (serviceId: string) => {
    setShowRequestModal(true);
  };

  // Handle submitting service request
  const handleSubmitRequest = (message: string) => {
    setShowRequestModal(false);
    setCurrentScreen("service-request");
  };

  // Handle navigation after service request
  const handleContinueAfterRequest = () => {
    setCurrentScreen("applications");
    setActiveTab("applications");
  };

  // Handle back from service details
  const handleBackFromDetails = () => {
    setCurrentScreen("feed");
  };

  // Handle opening chat
  const handleOpenChat = (serviceId: string) => {
    setChatServiceId(serviceId);
    setCurrentScreen("chat");
  };

  // Handle back from chat
  const handleBackFromChat = () => {
    if (userType === "developer") {
      // Check if coming from applications
      if (activeTab === "applications") {
        setCurrentScreen("applications");
      } else {
        setCurrentScreen("my-services");
      }
    } else {
      setCurrentScreen("candidates");
    }
  };

  // Handle viewing candidates (for companies)
  const handleViewCandidates = (serviceId: string) => {
    setSelectedService(
      selectedService || {
        id: serviceId,
        title: "Implementar autenticação JWT em API Node",
        description: "Service description",
        value: 3500,
        deadline: "5 dias",
        type: "Feature",
        level: "Pleno",
        stack: ["Node.js", "JWT"],
        company: "Tech Solutions",
        companyRating: 4.8,
      }
    );
    setCurrentScreen("candidates");
  };

  // Handle back from candidates
  const handleBackFromCandidates = () => {
    setCurrentScreen("my-services");
  };

  // Handle tab changes in bottom navigation
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    switch (tab) {
      case "feed":
        setCurrentScreen("feed");
        break;
      case "applications":
        setCurrentScreen("applications");
        break;
      case "my-services":
        setCurrentScreen("my-services");
        break;
      case "create":
        setCurrentScreen("create-service");
        break;
      case "profile":
        setCurrentScreen("profile");
        break;
    }
  };

  // Handle back from create service
  const handleBackFromCreateService = () => {
    setCurrentScreen("feed");
    setActiveTab("feed");
  };

  // Handle publish service
  const handlePublishService = () => {
    toast.success("Serviço publicado com sucesso!");
    setCurrentScreen("my-services");
    setActiveTab("my-services");
  };

  // Render appropriate screen
  const renderScreen = () => {
    switch (currentScreen) {
      case "onboarding":
        return <Onboarding onSelectType={handleSelectUserType} />;
      
      case "login":
        return <Login onLogin={handleLogin} />;
      
      case "feed":
        return <Feed 
          onViewService={handleViewService} 
          onOpenNotifications={() => setShowNotifications(true)}
          onOpenMessages={() => setShowMessages(true)}
        />;
      
      case "service-details":
        return selectedService ? (
          <>
            <ServiceDetails
              service={selectedService}
              onBack={handleBackFromDetails}
              onRequestService={handleRequestService}
            />
            <RequestServiceModal
              isOpen={showRequestModal}
              serviceName={selectedService.title}
              companyName={selectedService.company}
              onClose={() => setShowRequestModal(false)}
              onSubmit={handleSubmitRequest}
            />
          </>
        ) : null;
      
      case "service-request":
        return selectedService ? (
          <ServiceRequest
            serviceName={selectedService.title}
            onContinue={handleContinueAfterRequest}
          />
        ) : null;
      
      case "applications":
        return (
          <MyApplications
            onOpenChat={handleOpenChat}
            onViewService={(serviceId) => {
              // Find and view service
              handleViewService(selectedService || {
                id: serviceId,
                title: "Service Title",
                description: "Description",
                value: 3500,
                deadline: "5 dias",
                type: "Feature",
                level: "Pleno",
                stack: ["React"],
                company: "Company",
                companyRating: 4.8,
              });
            }}
            onOpenNotifications={() => setShowNotifications(true)}
            onOpenMessages={() => setShowMessages(true)}
          />
        );
      
      case "my-services":
        return (
          <MyServices
            onOpenChat={handleOpenChat}
            onViewCandidates={userType === "company" ? handleViewCandidates : undefined}
            userType={userType}
            onOpenNotifications={() => setShowNotifications(true)}
            onOpenMessages={() => setShowMessages(true)}
          />
        );
      
      case "candidates":
        return selectedService ? (
          <CandidateList
            serviceName={selectedService.title}
            onBack={handleBackFromCandidates}
            onOpenChat={handleOpenChat}
          />
        ) : null;
      
      case "chat":
        return chatServiceId ? (
          <Chat serviceId={chatServiceId} onBack={handleBackFromChat} />
        ) : null;
      
      case "create-service":
        return (
          <CreateService
            onBack={handleBackFromCreateService}
            onPublish={handlePublishService}
          />
        );
      
      case "profile":
        return <Profile userType={userType} />;
      
      default:
        return null;
    }
  };

  const showBottomNav = ["feed", "applications", "my-services", "profile"].includes(currentScreen) || 
    (currentScreen === "create-service" && userType === "company");

  return (
    <>
      {/* Mobile Container */}
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative">
          {renderScreen()}
          
          {/* Bottom Navigation */}
          {showBottomNav && (
            <BottomNav
              activeTab={activeTab}
              onTabChange={handleTabChange}
              userType={userType}
            />
          )}

          {/* Notification Panel */}
          <NotificationPanel
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
            userType={userType}
            onNotificationClick={(notificationId, type) => {
              setShowNotifications(false);
              // Handle notification click based on type
              if (type === "new_message" || type === "new_application") {
                setShowMessages(true);
              }
            }}
          />

          {/* Messages List */}
          <MessagesList
            isOpen={showMessages}
            onClose={() => setShowMessages(false)}
            onOpenChat={handleOpenChat}
            userType={userType}
          />
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-center" />
    </>
  );
}