"use client";

interface ErrorContingencyProps {
  errorMessage: string;
  onRetry: () => void;
  onGoBack?: () => void;
  isRetrying: boolean;
}

export default function ErrorContingency({
  errorMessage,
  onRetry,
  onGoBack,
  isRetrying,
}: ErrorContingencyProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Header */}
        <div>
          <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4">
            <svg
              className="w-7 h-7 text-red-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Não foi possível enviar sua participação agora.
          </h2>
          <p className="text-gray-600 text-sm">
            Suas respostas permanecem neste dispositivo. Tente novamente quando a conexão
            estiver disponível.
          </p>
        </div>

        {/* Data Safety Confirmation */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex gap-2">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-green-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-green-800 font-semibold mb-0.5">
                Seus dados estão seguros
              </p>
              <p className="text-xs text-green-700">
                Suas respostas foram salvas temporariamente e podem ser recuperadas.
              </p>
            </div>
          </div>
        </div>

        {/* Error Details */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-xs text-red-700">
              <span className="font-semibold">Detalhes:</span> {errorMessage}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          {/* Primary: Retry */}
          <button
            onClick={onRetry}
            disabled={isRetrying}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isRetrying ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Tentando novamente...
              </>
            ) : (
              "Tentar novamente"
            )}
          </button>

          {/* Secondary: Go Back */}
          {onGoBack && (
            <button
              onClick={onGoBack}
              disabled={isRetrying}
              className="w-full bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 active:bg-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              Voltar e revisar
            </button>
          )}
        </div>

        {/* Help Text */}
        <p className="text-xs text-gray-600 text-center">
          Se o problema persistir, suas respostas serão recuperadas automaticamente quando a
          conexão voltar.
        </p>
      </div>
    </div>
  );
}
