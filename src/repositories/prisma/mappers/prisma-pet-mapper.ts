import { Pet as PrismaPet } from '@/generated/prisma'
import { Pet } from '@/domain/entities/pet'

export class PrismaPetMapper {
  static toDomain(raw: PrismaPet): Pet {
    return Pet.create(
      {
        about: raw.about,
        name: raw.name,
        size: raw.size,
        images: raw.images,
        age: raw.age,
        environment: raw.environment,
        energyLevel: raw.energy_level,
        levelIndependence: raw.level_independence,
        orgId: raw.org_id,
      },
      raw.id
    )
  }

  static toPrisma(pet: Pet) {
    return {
      id: pet.id,
      about: pet.props.about,
      name: pet.props.name,
      size: pet.props.size,
      images: pet.props.images,
      age: pet.props.age,
      environment: pet.props.environment,
      energy_level: pet.props.energyLevel,
      level_independence: pet.props.levelIndependence,
      org_id: pet.props.orgId,
    }
  }
}
