import Fastify from 'fastify'
import { env } from './env'

const fastify = Fastify({
  logger: true,
})

try {
  fastify.listen({ port: env?.PORT, host: '0.0.0.0' })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
