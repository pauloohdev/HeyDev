import React from "react";
import { Mail, Github } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSignUp, setIsSignUp] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            {isSignUp ? "Criar conta" : "Entrar"}
          </h1>
          <p className="text-gray-600">
            {isSignUp
              ? "Comece a conectar empresas e desenvolvedores"
              : "Bem-vindo de volta!"}
          </p>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-12 border-2 hover:bg-gray-50"
            onClick={onLogin}
          >
            <Mail className="w-5 h-5 mr-2" />
            Continuar com Google
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 border-2 hover:bg-gray-50"
            onClick={onLogin}
          >
            <Github className="w-5 h-5 mr-2" />
            Continuar com GitHub
          </Button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">ou</span>
          </div>
        </div>

        {/* Email Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="mt-1 h-12"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-700">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 h-12"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {isSignUp ? "Criar conta" : "Entrar"}
          </Button>
        </form>

        {/* Toggle Sign Up / Login */}
        <div className="text-center text-sm">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            {isSignUp
              ? "Já tem uma conta? Entrar"
              : "Não tem conta? Criar agora"}
          </button>
        </div>

        {/* Security note */}
        <p className="text-xs text-gray-500 text-center">
          🔒 Seus dados estão protegidos com criptografia de ponta a ponta
        </p>
      </div>
    </div>
  );
}
