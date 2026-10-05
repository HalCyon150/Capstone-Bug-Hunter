import Link from "next/link";
import { Difficulty } from "@prisma/client";

interface ChallengeCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  techStack: string[];
}

export function ChallengeCard({ id, title, description, difficulty, techStack }: ChallengeCardProps) {
  // Configuración de estilos según la dificultad para que coincida con el mockup
  const difficultyStyles = {
    FACIL: "bg-badge-facil-bg text-badge-facil-text",
    MEDIO: "bg-badge-medio-bg text-badge-medio-text",
    DIFICIL: "bg-badge-dificil-bg text-badge-dificil-text",
  };

  return (
    <div className="bg-bh-card border border-bh-border rounded-xl p-5 flex flex-col h-full hover:border-bh-yellow/50 transition-colors duration-300">
      
      {/* Cabecera: Dificultad y Stack */}
      <div className="flex items-center justify-between mb-4">
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${difficultyStyles[difficulty]}`}>
          {difficulty}
        </span>
        <div className="flex gap-2">
          {techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="text-[10px] bg-bh-secondary text-bh-muted border border-bh-border px-2 py-1 rounded-md">
              {tech}
            </span>
          ))}
          {techStack.length > 3 && (
            <span className="text-[10px] bg-bh-secondary text-bh-muted border border-bh-border px-2 py-1 rounded-md">
              +{techStack.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Título y Descripción */}
      <h3 className="text-lg font-bold text-white leading-tight mb-2 line-clamp-2">
        {title}
      </h3>
      <p className="text-sm text-bh-muted line-clamp-3 mb-6 flex-grow">
        {description}
      </p>

      {/* Botón de Acción */}
      <Link 
        href={`/desafios/${id}`}
        className="w-full text-center bg-bh-secondary hover:bg-bh-border border border-bh-border text-white text-xs font-semibold py-2.5 rounded-lg transition"
      >
        Ver Detalles del Desafío
      </Link>
    </div>
  );
}