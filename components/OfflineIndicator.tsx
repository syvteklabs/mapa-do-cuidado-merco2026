"use client";

import { IconAlert, IconSuccess } from "./icons/Icons";
import { colors } from "@/lib/designTokens";

interface OfflineIndicatorProps {
  isOnline: boolean;
  isSyncing?: boolean;
  pendingCount?: number;
  compact?: boolean;
}

export default function OfflineIndicator({
  isOnline,
  isSyncing = false,
  pendingCount = 0,
  compact = false,
}: OfflineIndicatorProps) {
  if (compact) {
    // Minimal compact version for header
    if (isOnline && !isSyncing && pendingCount === 0) {
      return null; // Don't show when everything is normal
    }

    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
          isOnline
            ? isSyncing
              ? "bg-amber-100 text-amber-700"
              : "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isOnline
              ? isSyncing
                ? "bg-amber-600 animate-pulse"
                : "bg-green-600"
              : "bg-red-600 animate-pulse"
          }`}
        />
        {!isOnline && "Offline"}
        {isOnline && isSyncing && "Sincronizando..."}
        {isOnline && !isSyncing && pendingCount > 0 && `${pendingCount} pendentes`}
      </div>
    );
  }

  // Full version for display in forms
  return (
    <div
      className={`border rounded-lg p-4 flex items-start gap-3 ${
        isOnline
          ? isSyncing
            ? "bg-amber-50 border-amber-200"
            : "bg-green-50 border-green-200"
          : "bg-red-50 border-red-200"
      }`}
    >
      <div className="flex-shrink-0 mt-0.5">
        {isOnline && !isSyncing && (
          <IconSuccess size={20} color={colors.success[600]} />
        )}
        {isSyncing && (
          <div className="w-5 h-5 border-2 border-amber-300 border-t-amber-600 rounded-full animate-spin" />
        )}
        {!isOnline && <IconAlert size={20} color={colors.error[600]} />}
      </div>

      <div className="flex-1">
        <h4
          className={`font-semibold mb-1 ${
            isOnline
              ? isSyncing
                ? "text-amber-900"
                : "text-green-900"
              : "text-red-900"
          }`}
        >
          {!isOnline && "Você está offline"}
          {isOnline && isSyncing && "Sincronizando respostas..."}
          {isOnline && !isSyncing && pendingCount === 0 && "Conectado"}
          {isOnline && !isSyncing && pendingCount > 0 && "Pronto para enviar"}
        </h4>

        <p
          className={`text-sm ${
            isOnline
              ? isSyncing
                ? "text-amber-800"
                : "text-green-800"
              : "text-red-800"
          }`}
        >
          {!isOnline &&
            "Sua resposta ficou salva neste dispositivo e será enviada assim que a conexão voltar."}
          {isOnline && isSyncing && "Enviando respostas em fila..."}
          {isOnline && !isSyncing && pendingCount === 0 &&
            "Sua conexão está estável e todas as respostas foram enviadas."}
          {isOnline && !isSyncing && pendingCount > 0 &&
            `${pendingCount} resposta${pendingCount > 1 ? "s" : ""} aguardando envio.`}
        </p>

        {pendingCount > 0 && (
          <p className="text-xs font-semibold text-gray-600 mt-2">
            Contador: {pendingCount} pendente{pendingCount > 1 ? "s" : ""}
          </p>
        )}
      </div>
    </div>
  );
}
