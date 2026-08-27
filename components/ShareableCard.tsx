"use client";

import { useState } from "react";

interface ShareableCardProps {
  municipio?: string;
  tema?: string;
}

export default function ShareableCard({ municipio, tema }: ShareableCardProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.origin + "/participar" : "";
  const mainText = "Eu ajudei a construir o Mapa do Cuidado do Noroeste Fluminense.";
  const complementText = "Cada experiência ajuda o território a enxergar melhor.";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      alert("Não foi possível copiar o link");
    }
  };

  const handleWhatsAppShare = () => {
    const text = `${mainText} ${complementText} Participe você também: ${shareUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleDownloadCard = () => {
    // Create a canvas element for the shareable card
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set dimensions
    canvas.width = 1080;
    canvas.height = 1350;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#3b82f6"); // Blue
    gradient.addColorStop(1, "#4f46e5"); // Indigo
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // White card area
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(40, 200, canvas.width - 80, 900);
    ctx.fillStyle = "#3b82f6";
    ctx.font = "bold 48px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✨", canvas.width / 2, 300);

    // Main text
    ctx.fillStyle = "#111827";
    ctx.font = "bold 56px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    const mainLines = mainText.split(" ");
    let y = 450;
    let line = "";
    for (let word of mainLines) {
      const testLine = line + (line ? " " : "") + word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 900 && line) {
        ctx.fillText(line, canvas.width / 2, y);
        line = word;
        y += 80;
      } else {
        line = testLine;
      }
    }
    if (line) ctx.fillText(line, canvas.width / 2, y);

    // Complement text
    y += 150;
    ctx.fillStyle = "#4b5563";
    ctx.font = "40px Inter, system-ui, sans-serif";
    ctx.fillText(complementText, canvas.width / 2, y);

    // Logo/branding
    ctx.fillStyle = "#3b82f6";
    ctx.font = "36px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Mapa do Cuidado", canvas.width / 2, canvas.height - 150);
    ctx.fillStyle = "#6b7280";
    ctx.font = "28px Inter, system-ui, sans-serif";
    ctx.fillText("Noroeste Fluminense", canvas.width / 2, canvas.height - 80);

    // Download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "mapa-do-cuidado-card.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8">
      {/* Card Preview */}
      <div className="bg-white rounded-lg shadow-lg p-8 text-center space-y-4 border-2 border-blue-100">
        <div className="text-5xl">✨</div>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {mainText}
        </h3>
        <p className="text-lg text-gray-700">
          {complementText}
        </p>
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">Mapa do Cuidado</p>
          <p className="text-sm font-semibold text-blue-600">Noroeste Fluminense</p>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="space-y-3">
        <p className="text-center text-sm font-semibold text-gray-700">
          Compartilhe sua contribuição
        </p>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppShare}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 flex items-center justify-center gap-3"
        >
          <span className="text-2xl">💬</span>
          Compartilhar no WhatsApp
        </button>

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className={`w-full font-bold py-4 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-3 ${
            copySuccess
              ? "bg-green-100 text-green-700 focus:ring-green-400"
              : "bg-blue-100 hover:bg-blue-200 text-blue-700 focus:ring-blue-400"
          }`}
        >
          <span className="text-2xl">{copySuccess ? "✓" : "🔗"}</span>
          {copySuccess ? "Link copiado!" : "Copiar link"}
        </button>

        {/* Download Card Button */}
        <button
          onClick={handleDownloadCard}
          className="w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold py-4 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 flex items-center justify-center gap-3"
        >
          <span className="text-2xl">📥</span>
          Baixar card
        </button>
      </div>

      {/* Privacy Note */}
      <p className="text-xs text-center text-gray-600">
        💡 Dica: Nenhuma informação pessoal é incluída no compartilhamento. O card mostra apenas sua contribuição à causa.
      </p>
    </div>
  );
}
