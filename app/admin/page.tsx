"use client";

import { useEffect, useState } from "react";
import AdminDashboard from "@/components/AdminDashboard";
import { IconAlert } from "@/components/icons/Icons";
import { colors } from "@/lib/designTokens";

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Simple password protection (should be replaced with proper authentication)
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setAuthorized(true);
      setError("");
      // Store in sessionStorage so it persists during the session
      sessionStorage.setItem("admin_authorized", "true");
    } else {
      setError("Senha incorreta");
      setPassword("");
    }
  };

  useEffect(() => {
    // Check if already authorized from sessionStorage
    if (sessionStorage.getItem("admin_authorized")) {
      setAuthorized(true);
    }
  }, []);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel Admin</h1>
            <p className="text-gray-600 mb-8">
              Acesso restrito para membros da equipe
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Senha de acesso
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite a senha"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
                  <IconAlert size={16} color={colors.error[600]} className="flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors"
              >
                Acessar painel
              </button>
            </form>

            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-xs text-amber-800">
                <span className="font-semibold">Nota:</span> Este painel é protegido por senha básica. Para produção, implemente autenticação adequada com OAuth2 ou similar.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Painel de Operação</h1>
          <button
            onClick={() => {
              sessionStorage.removeItem("admin_authorized");
              setAuthorized(false);
            }}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-semibold"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <AdminDashboard />
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 px-4 py-6 text-center text-xs text-gray-500 mt-12">
        <p>Painel de operação - Apenas para membros da equipe autorizada</p>
      </footer>
    </div>
  );
}
