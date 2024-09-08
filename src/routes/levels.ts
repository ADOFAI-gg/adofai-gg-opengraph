import { FastifyPluginAsync } from 'fastify'
import { Type } from '@sinclair/typebox'
import dayjs from 'dayjs'
import DayJsTimezone from 'dayjs/plugin/timezone.js'
import DayJsUTC from 'dayjs/plugin/utc.js'
import fetch from 'node-fetch'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { generateSVG } from '../generator/index.js'
import { renderAsync } from '@resvg/resvg-js'

// @ts-expect-error
global.fetch = fetch

dayjs.extend(DayJsUTC)
dayjs.extend(DayJsTimezone)

const schema = Type.Object({
  id: Type.Integer(),
})

const querySchema = Type.Object({
  raw: Type.Boolean({ default: false }),
})

export const levels: FastifyPluginAsync = async (_server) => {
  const server = _server.withTypeProvider<TypeBoxTypeProvider>()
  server.get(
    '/levels/:id',
    {
      schema: {
        params: schema,
        querystring: querySchema,
      },
    },
    async (req, reply) => {
      const id = req.params.id
      if (isNaN(id)) return reply.status(400).send('Invalid ID')

      reply.header('Cache-Control', 'max-age=86400')

      if (process.env.DEBUG && req.query.raw) {
        const generated = await generateSVG(id)
        return reply.header('Content-Type', 'image/svg+xml').send(generated)
      }

      const generated = await generateSVG(id)
      const img = (await renderAsync(generated)).asPng()

      return reply.header('Content-Type', 'image/png').send(img)
    },
  )
}
