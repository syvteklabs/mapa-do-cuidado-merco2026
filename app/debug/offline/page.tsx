"use client";

import { useState } from "react";
import Link from "next/link";
import { IconAlert } from "@/components/icons/Icons";
import { colors } from "@/lib/designTokens";

export default function OfflineDebugPage() {
  const [testModeEnabled, setTestModeEnabled] = useState(false);
  const [queuedItems, setQueuedItems] = useState<number>(0);

  const toggleTestMode = () => {
    const enabled = !testModeEnabled;
    setTestModeEnabled(enabled);

    if (typeof window !== "undefined") {
      sessionStorage.setItem("offline_test_mode", enabled ? "true" : "false");
      window.location.reload();
    }
  };

  const checkQueue = () => {
    if (typeof window !== "undefined") {
      try {
        const queue = localStorage.getItem("mapa_offline_queue");
        const items = queue ? JSON.parse(queue) : [];
        setQueuedItems(items.length);
      } catch (err) {
        console.error("Error checking queue:", err);
      }
    }
  };

  const clearQueue = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("mapa_offline_queue");
      setQueuedItems(0);
      alert("Fila local limpa");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            ← Voltar para casa
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Debug: Teste de Modo Offline
            </h1>
            <p className="text-gray-600">
              Esta página permite testar o comportamento do aplicativo quando a conexão está instável ou ausente.
            </p>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 flex gap-3">
            <IconAlert size={20} color={colors.warning[600]} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900 mb-1">Modo de Teste</p>
              <p className="text-sm text-amber-800">
                Esta página é apenas para desenvolvimento e testes. Não será visível em produção.
              </p>
            </div>
          </div>

          {/* Test Controls */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Controles de Teste</h2>

            {/* Offline Mode Toggle */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-3">Simular Modo Offline</h3>
              <p className="text-sm text-gray-600 mb-4">
                Ativa o modo offline para testar a fila de sincronização e o armazenamento local.
              </p>
              <button
                onClick={toggleTestMode}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  testModeEnabled
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {testModeEnabled ? "Desativar Modo Offline" : "Ativar Modo Offline"}
              </button>
              <p className="text-xs text-gray-500 mt-3">
                Status: <span className="font-semibold">{testModeEnabled ? "OFFLINE" : "ONLINE"}</span>
              </p>
            </div>

            {/* Queue Management */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-3">Gerenciador de Fila Local</h3>
              <p className="text-sm text-gray-600 mb-4">
                Visualize e gerencie os itens enfileirados para sincronização.
              </p>
              <div className="space-y-3">
                <button
                  onClick={checkQueue}
                  className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Verificar fila ({queuedItems} itens)
                </button>
                <button
                  onClick={clearQueue}
                  className="w-full px-4 py-2 border border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                  disabled={queuedItems === 0}
                >
                  Limpar fila
                </button>
              </div>
            </div>

            {/* Storage Info */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-3">Informações de Armazenamento</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-sm font-mono space-y-2">
                <div>
                  <p className="text-gray-600">Fila Local:</p>
                  <p className="text-gray-900">localStorage.getItem("mapa_offline_queue")</p>
                </div>
                <div>
                  <p className="text-gray-600">Dados do Formulário:</p>
                  <p className="text-gray-900">localStorage.getItem("mapa-cuidado-form-data")</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testing Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-blue-900">Como Testar</h2>
            <ol className="space-y-2 text-sm text-blue-800">
              <li><strong>1.</strong> Clique em "Ativar Modo Offline" acima</li>
              <li><strong>2.</strong> Acesse a página <Link href="/participar" className="text-blue-600 hover:text-blue-700 underline">de participação</Link></li>
              <li><strong>3.</strong> Preencha o formulário normalmente</li>
              <li><strong>4.</strong> Envie a resposta - ela será salva localmente</li>
              <li><strong>5.</strong> Observe a mensagem explicando que a resposta foi enfileirada</li>
              <li><strong>6.</strong> Retorne aqui e clique "Verificar fila" para ver o item</li>
              <li><strong>7.</strong> Clique "Desativar Modo Offline" para simular reconexão</li>
              <li><strong>8.</strong> A resposta será sincronizada automaticamente</li>
            </ol>
          </div>

          {/* Technical Details */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Detalhes Técnicos</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Respostas são enfileiradas em localStorage com ID único</li>
              <li>✓ Status de cada item: pending, syncing, failed</li>
              <li>✓ Retry automático até 5 tentativas</li>
              <li>✓ Sincronização automática ao reconectar</li>
              <li>✓ Sem dados pessoais armazenados localmente</li>
              <li>✓ Limpeza segura após sincronização bem-sucedida</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
