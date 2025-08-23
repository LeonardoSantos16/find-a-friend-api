export type OrganizationProps = {
  email: string
  password: string
  responsibleName: string
  cep: string
  address: string
  whatsapp: string
  city: string
  createdAt?: Date
}

export class Organization {
  public id: string
  public props: OrganizationProps

  private constructor(props: OrganizationProps, id?: string) {
    this.id = id ?? crypto.randomUUID()
    this.props = props
  }

  public static create(props: OrganizationProps, id?: string) {
    const organization = new Organization(props, id)
    return organization
  }
}
