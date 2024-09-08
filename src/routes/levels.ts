import { FastifyPluginAsync } from 'fastify'
import { Type } from '@sinclair/typebox'
import dayjs from 'dayjs'
import DayJsTimezone from 'dayjs/plugin/timezone.js'
import DayJsUTC from 'dayjs/plugin/utc.js'
import fetch from 'node-fetch'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { generateSVG } from '../generator/index.js'
import sharp from 'sharp'
import { mkdtemp, unlink, writeFile } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'

const instanceId = Date.now()

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

      const file = join(tmpdir(), `adofaigg-og-${instanceId}.${req.id}.svg`)

      try {
        await writeFile(file, generated)

        const img = await sharp(file).png().toBuffer()
        return reply.header('Content-Type', 'image/png').send(img)
      } finally {
        await unlink(file).catch((e) =>
          console.warn('Failed to unlink image file', e),
        )
      }
    },
  )
}
