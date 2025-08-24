import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { CreatePetUseCase } from '@/use-cases/create-pet.use-case'
import { GetPetDetailsUseCase } from '@/use-cases/get-pet-details.use-case'
import { SearchPetsUseCase } from '@/use-cases/search-pets.use-case'

export async function create(request: FastifyRequest, response: FastifyReply) {
  const createPetBodySchema = z.object({
    about: z.string(),
    name: z.string(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    age: z.enum(['PUPPY', 'ADULT', 'SENIOR']),
    energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    levelIndependence: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    environment: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    orgId: z.string(),
    images: z.string().array(),
  })

  const payload = createPetBodySchema.parse(request.body)

  try {
    const petRepository = new PrismaPetRepository()
    const createPetUseCase = new CreatePetUseCase(petRepository)

    await createPetUseCase.execute(payload)

    return response.status(201).send()
  } catch (error) {
    return response.status(500).send({ message: 'Internal server error' })
  }
}

export async function getDetails(
  request: FastifyRequest,
  response: FastifyReply
) {
  const getPetDetailsParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getPetDetailsParamsSchema.parse(request.params)

  try {
    const petRepository = new PrismaPetRepository()
    const getPetDetailsUseCase = new GetPetDetailsUseCase(petRepository)

    const pet = await getPetDetailsUseCase.execute(id)

    return response.status(200).send({ pet })
  } catch (error) {
    if (error) {
      return response.status(404).send({ message: error })
    }
    return response.status(500).send({ message: 'Internal server error' })
  }
}

export async function search(request: FastifyRequest, response: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string().optional(),
    levelIndependence: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
  })

  const payload = searchPetsQuerySchema.parse(request.query)

  try {
    const petRepository = new PrismaPetRepository()
    const searchPetsUseCase = new SearchPetsUseCase(petRepository)

    const { pets } = await searchPetsUseCase.execute(payload)

    return response.status(200).send({ pets })
  } catch (error) {
    return response.status(500).send({ message: 'Internal server error' })
  }
}
