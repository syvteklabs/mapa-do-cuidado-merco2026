import { CheckIcon, ArrowRightIcon, LightbulbIcon } from "./Icons";
import { animationClasses } from "@/lib/animations";

export default function ProjectStatus() {
  const phases = [
    {
      title: "Disponível agora",
      icon: CheckIcon,
      color: "green",
      items: [
        "Escuta participativa anônima.",
        "Primeiro ciclo nos 13 municípios.",
        "Visualização agregada por município.",
        "Temas percebidos nas participações.",
        "Lista de interesse para expansão.",
      ],
    },
    {
      title: "Em validação durante a Merco",
      icon: ArrowRightIcon,
      color: "amber",
      items: [
        "Clareza das perguntas.",
        "Engajamento da população.",
        "Utilidade das visualizações.",
        "Compreensão dos temas apresentados.",
        "Funcionamento da experiência em tablets.",
      ],
    },
    {
      title: "Visão de evolução",
      icon: LightbulbIcon,
      color: "slate",
      items: [
        "Novos ciclos territoriais.",
        "Análises temporais.",
        "Visualizações mais aprofundadas.",
        "Estudos acadêmicos mediante requisitos éticos.",
        "Integração futura com iniciativas de coordenação do cuidado.",
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "green":
        return {
          icon: "bg-green-100 text-green-700",
          badge: "bg-green-50 border-green-200",
          title: "text-green-900",
        };
      case "amber":
        return {
          icon: "bg-amber-100 text-amber-700",
          badge: "bg-amber-50 border-amber-200",
          title: "text-amber-900",
        };
      case "slate":
        return {
          icon: "bg-slate-100 text-slate-700",
          badge: "bg-slate-50 border-slate-200",
          title: "text-slate-900",
        };
      default:
        return {
          icon: "bg-gray-100 text-gray-700",
          badge: "bg-gray-50 border-gray-200",
          title: "text-gray-900",
        };
    }
  };

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Onde o projeto está hoje
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            O Mapa do Cuidado está em desenvolvimento contínuo. Conheca o que funciona hoje, o que
            estamos validando e para onde queremos evoluir.
          </p>
        </div>

        {/* Three Phases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phases.map((phase, idx) => {
            const colors = getColorClasses(phase.color);
            return (
              <div
                key={idx}
                className={`border rounded-lg p-6 sm:p-8 ${colors.badge} ${animationClasses.fadeInUp}`}
                style={{
                  animationDelay: `${idx * 100}ms`,
                }}
              >
                {/* Icon and Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.icon}`}>
                    <phase.icon className="w-5 h-5" aria-hidden={true} />
                  </div>
                  <h3 className={`text-xl font-bold ${colors.title}`}>{phase.title}</h3>
                </div>

                {/* Items List */}
                <ul className="space-y-3">
                  {phase.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex gap-3 text-gray-700 text-sm leading-relaxed">
                      <span className="text-gray-400 flex-shrink-0 font-semibold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Clarification Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <p className="text-sm text-blue-900 leading-relaxed">
            <span className="font-semibold block mb-2">Transparência:</span>
            A seção "Visão de evolução" representa possibilidades futuras e compromissos de
            desenvolvimento, não garantias de disponibilidade. O projeto continua aberto a ajustes
            baseados no aprendizado coletivo da Merco e nas prioridades do território. Nenhuma
            integração com serviços públicos é garantida sem aprovação institucional e procedimentos
            específicos.
          </p>
        </div>
      </div>
    </section>
  );
}
