import 'dotenv/config'
import { PrismaClient, Role, Difficulty, TaskStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Limpiar datos previos si existen
  await prisma.auditLog.deleteMany()
  await prisma.taskAssignment.deleteMany()
  await prisma.challenge.deleteMany()
  await prisma.user.deleteMany()

  // 1. Crear Usuario Docente / Creador
  const docente = await prisma.user.create({
    data: {
      name: 'Profe Avaras',
      email: 'avaras@duocuc.cl',
      githubUsername: 'avaras-duoc',
      role: Role.CREATOR,
    },
  })

  // 2. Crear Estudiante
  const estudiante = await prisma.user.create({
    data: {
      name: 'Martín Salas',
      email: 'm.salas@duocuc.cl',
      githubUsername: 'martinsalas',
      role: Role.STUDENT,
    },
  })

  // 3. Crear Desafío de prueba (el del mockup)
  const challenge1 = await prisma.challenge.create({
    data: {
      title: 'Crear componente de tarjeta de producto para una tienda de ropa',
      description: 'Construir un componente visual en React con Tailwind CSS para una tienda de ropa estudiantil o emprendimiento local. Debe ser adaptable a móviles.',
      difficulty: Difficulty.FACIL,
      techStack: ['React', 'Tailwind CSS', 'Frontend'],
      repoUrl: 'https://github.com/duoc-santiago/tienda-ropa-ui',
      creatorId: docente.id,
    },
  })

  // 4. Crear Asignación activa con Timeout (6 horas)
  const expiresAt = new Date()
  expiresAt.setHours(expiresAt.getHours() + 6)

  await prisma.taskAssignment.create({
    data: {
      userId: estudiante.id,
      challengeId: challenge1.id,
      branchName: 'bug-hunter/task-492',
      status: TaskStatus.EN_DESARROLLO,
      expiresAt: expiresAt,
    },
  })

  console.log('✅ Base de datos sembrada con éxito con datos de prueba.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })