import fastify from 'fastify'
import { levels } from './routes/levels.js'
import fastifyCaching from '@fastify/caching'

const server = fastify()

await server.register(levels)

console.log(
  'Listening on',
  await server.listen({ port: 5000, host: '0.0.0.0' })
)
