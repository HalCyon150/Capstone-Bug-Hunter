import { prisma } from "@/lib/prisma";
import { ChallengeCard } from "@/components/challenge-card";

// Next.js revalidará esta página cada cierto tiempo o podemos dejarla dinámica
export const dynamic = "force-dynamic";

export default async function Home() {
  // 1. Consultar a la base de datos (PostgreSQL vía Docker)
  // Traemos todos los desafíos, ordenados por los más recientes
  const challenges = await prisma.challenge.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Hero Section */}
      <section className="mb-12 py-10 border-b border-bh-border">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          Potencia tu portafolio resolviendo <br className="hidden md:block"/>
          <span className="text-bh-yellow">bugs del mundo real.</span>
        </h1>
        <p className="text-bh-muted text-lg max-w-2xl">
          BugHunter te asigna entornos de desarrollo aislados. Toma un ticket, crea tu rama, empuja el código y valida tus conocimientos prácticos.
        </p>
      </section>

      {/* Filtros (Visuales por ahora para el mockup) */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="bg-bh-card border border-bh-yellow text-bh-yellow text-xs font-semibold px-4 py-2 rounded-full">
          Todos los proyectos
        </button>
        <button className="bg-bh-secondary border border-bh-border text-bh-muted hover:text-white hover:border-gray-600 text-xs font-medium px-4 py-2 rounded-full transition">
          Frontend
        </button>
        <button className="bg-bh-secondary border border-bh-border text-bh-muted hover:text-white hover:border-gray-600 text-xs font-medium px-4 py-2 rounded-full transition">
          Backend
        </button>
      </div>

      {/* Grid de Desafíos */}
      <section>
        {challenges.length === 0 ? (
          <div className="text-center py-20 bg-bh-card border border-bh-border rounded-xl">
            <p className="text-bh-muted">Aún no hay desafíos publicados por los docentes.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                id={challenge.id}
                title={challenge.title}
                description={challenge.description}
                difficulty={challenge.difficulty}
                techStack={challenge.techStack}
              />
            ))}
          </div>
        )}
      </section>

    </main>
  );
}