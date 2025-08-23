import {
  Size,
  Age,
  EnergyLevel,
  EnvironmentType,
  IndependenceLevel,
} from '@/generated/prisma'

export type PetProps = {
  about: string
  name: string
  size: Size
  images: string[]
  age: Age
  environment: EnvironmentType
  energyLevel: EnergyLevel
  levelIndependence: IndependenceLevel
  orgId: string
}

export class Pet {
  public id: string
  public props: PetProps

  private constructor(props: PetProps, id?: string) {
    this.id = id ?? crypto.randomUUID()
    this.props = props
  }

  public static create(props: PetProps, id?: string) {
    const pet = new Pet(props, id)
    return pet
  }
}
