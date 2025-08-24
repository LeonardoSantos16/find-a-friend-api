import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterOrgUseCase } from '@/use-cases/register-org.use-case'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { GetOrgByEmailUseCase } from '@/use-cases/get-org-by-id.use-case'
export async function registerOrg(
  request: FastifyRequest,
  response: FastifyReply
) {
  const registerBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
    address: z.string(),
    city: z.string(),
    whatsapp: z.string(),
    responsibleName: z.string(),
    cep: z.string(),
  })
  const payload = registerBodySchema.parse(request.body)

  try {
    const orgsRepository = new PrismaOrganizationsRepository()
    const registerUseCase = new RegisterOrgUseCase(orgsRepository)

    await registerUseCase.execute(payload)
  } catch (error) {
    return response.status(500).send({ message: error })
  }

  return response.status(201)
}

export async function getOrgByEmail(
  request: FastifyRequest,
  response: FastifyReply
) {
  const getOrgByEmailParamsSchema = z.object({ id: z.string() })
  const { id } = getOrgByEmailParamsSchema.parse(request.params)
  try {
    const orgsRepository = new PrismaOrganizationsRepository()
    const registerUseCase = new GetOrgByEmailUseCase(orgsRepository)

    await registerUseCase.execute(id)
  } catch (error) {
    return response.status(500).send({ message: error })
  }
  return response.status(200).send()
}
