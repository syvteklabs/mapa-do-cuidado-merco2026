"use client";

import Link from "next/link";

interface PrivacyDisclosureProps {
  variant?: "minimal" | "full";
}

export default function PrivacyDisclosure({ variant = "minimal" }: PrivacyDisclosureProps) {
  if (variant === "full") {
    return (
      <div className="space-y-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-3">
            Sua privacidade é nossa prioridade
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>Para participação no Mapa:</strong> Não solicitamos nome, email, telefone, endereço residencial, dados clínicos ou identificação pessoal.
            </p>
            <p>
              <strong>O que você fornece:</strong> Seu município de residência (sem rua/número) e qual experiência de cuidado você compartilha.
            </p>
            <p>
              <strong>Como usamos:</strong> Seus dados são agregados (combinados com outros) para criar visualizações no mapa e gerar sinais que podem apoiar análises e decisões.
            </p>
            <p>
              <strong>Nota:</strong> A Lista de Expansão coleta nome e contato. Veja nossa política completa para detalhes sobre ambos os processos.
            </p>
            <p>
              <strong>Isto não é pesquisa populacional:</strong> É uma escuta participativa qualitativa. Números indicam tendências, não prevalência estatística.
            </p>
          </div>
        </div>
        <Link
          href="/privacidade"
          className="inline-block text-blue-600 hover:text-blue-700 font-semibold text-sm underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
        >
          Leia nossa política completa de privacidade →
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center text-xs text-gray-600 space-y-2">
      <p>
        📋{" "}
        <Link
          href="/privacidade"
          className="text-blue-600 hover:text-blue-700 font-semibold underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
        >
          Como os dados são usados
        </Link>
        {" "}• Sem dados pessoais solicitados • Dados agregados
      </p>
    </div>
  );
}
