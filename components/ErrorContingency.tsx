"use client";

interface ErrorContingencyProps {
  errorMessage: string;
  onRetry: () => void;
  isRetrying: boolean;
}

export default function ErrorContingency({
  errorMessage,
  onRetry,
  isRetrying,
}: ErrorContingencyProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 sm:p-8 text-center space-y-6 shadow-2xl">
        <div>
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Oops! Algo não deu certo
          </h2>
          <p className="text-gray-600 mb-4">
            Parece que temos uma dificuldade de conexão. Mas não se preocupe!
          </p>
          <p className="text-sm text-gray-700 bg-blue-50 border border-blue-200 rounded-lg p-4">
            {errorMessage}
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
          <p className="text-sm text-green-800 font-semibold mb-2">
            ✓ Seus dados estão seguros
          </p>
          <p className="text-xs text-green-700">
            Salvamos suas respostas temporariamente. Tente novamente quando a
            conexão melhorar.
          </p>
        </div>

        <button
          onClick={onRetry}
          disabled={isRetrying}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isRetrying ? "Tentando novamente..." : "Tentar Novamente"}
        </button>

        <p className="text-xs text-gray-500">
          Se o problema persistir, você poderá recuperar suas respostas quando
          a conexão voltar.
        </p>
      </div>
    </div>
  );
}
