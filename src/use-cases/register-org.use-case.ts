import { Organization } from '@/domain/entities/organization'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'

interface RegisterOrgUseCaseRequest {
  email: string
  password: string
  responsibleName: string
  cep: string
  address: string
  whatsapp: string
  city: string
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    address,
    cep,
    city,
    password,
    responsibleName,
    whatsapp,
  }: RegisterOrgUseCaseRequest) {
    const emailOrgExists = await this.orgsRepository.findByEmail(email)
    if (emailOrgExists) {
      //TODO: tratar o erro depois
      throw new Error('Organização com email já existez')
    }

    const passwordHash = await hash(password, 6)

    const organization = Organization.create({
      email,
      address,
      cep,
      city,
      password: passwordHash,
      responsibleName,
      whatsapp,
    })

    await this.orgsRepository.create(organization)
  }
}
