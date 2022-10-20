import { FastifyPluginAsync } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import satori from 'satori'
import { api, fonts, getYoutubeVideoId } from '../utils.js'
import { renderAsync } from '@resvg/resvg-js'
import axios from 'axios'
import dayjs from 'dayjs'
import DayJsTimezone from 'dayjs/plugin/timezone.js'
import DayJsUTC from 'dayjs/plugin/utc.js'
import React from 'react'
import fetch from 'node-fetch'

// @ts-expect-error
global.fetch = fetch

dayjs.extend(DayJsUTC)
dayjs.extend(DayJsTimezone)

const schema = Type.Object({
  id: Type.String(),
})

interface Level {
  id: number
  title: string
  difficulty: number

  creators: Member[]

  music: Music

  tiles: number
  video: string
  tags: Tag[]

  epilepsyWarning: boolean
}

interface Tag {
  id: number
  name: string
}

interface Music {
  id: number
  name: string
  minBpm: number
  maxBpm: number
  artists: Member[]
}

interface Member {
  id: number
  name: string
}

const difficultyIconCache = new Map<number, Promise<string>>()

const loadDifficultyIcon = async (difficulty: number) => {
  return `https://raw.githubusercontent.com/ADOFAI-gg/Adofai-gg-assets/main/difficultyIcons/${difficulty}.svg`
}

const tagIconCache = new Map<string, Promise<string>>()

const highlightedTags: string[] = ['4', 'SW']

const excludedTags: string[] = ['11', '1']

const loadTagIcon = async (tag: string) => {
  let { data } = await axios.get<string>(
    `https://raw.githubusercontent.com/ADOFAI-gg/Adofai-gg-assets/main/tagIcons/${tag}.svg`
  )

  if (highlightedTags.includes(tag)) {
    data = data
      .replaceAll('fill="white"', 'fill="#F54F51"')
      .replaceAll('stroke="white"', 'stroke="#F54F51"')
  } else if (tag === '25') {
    data = data
      .replaceAll('fill="white"', 'fill="#FFE76E"')
      .replaceAll('stroke="white"', 'stroke="#FFE76E"')
  }

  return `data:image/png;base64,${(
    await renderAsync(data, {
      fitTo: {
        mode: 'width',
        value: 28,
      },
    })
  )
    .asPng()
    .toString('base64')}`
}

const svg2png = async (svg: string) =>
  `data:image/png;base64,${(await renderAsync(svg)).asPng().toString('base64')}`

const logo =
  await svg2png(`<svg width="96" height="12" viewBox="0 0 96 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.371231 11.0756L0 11.7689H3.11127L3.23501 11.5378L5.76292 6.93333L4.20729 4.12444L0.371231 11.0756ZM13.1345 11.0756L8.18476 2.09778L7.15946 0.24889L7.05339 0H6.45235L6.32861 0.24889L5.32098 2.09778L5.19724 2.32889L6.75287 5.15556L6.78823 5.22667L7.93728 7.30667L10.2707 11.5378L10.3945 11.7689H13.5057L13.1345 11.0756Z" fill="white"/>
<path d="M25.2742 5.10222C25.0798 3.71556 24.408 2.43556 23.3651 1.51111C22.4105 0.657779 21.1907 0.142223 19.9356 0.0533337L14.7383 0.0355562V2.52444H19.6351C19.8118 2.54222 19.9886 2.56 20.1477 2.59556C20.6427 2.70222 21.1023 2.91556 21.5089 3.21778C22.1807 3.71556 22.6226 4.44444 22.7994 5.26222C22.8347 5.47556 22.8524 5.70667 22.8524 5.92C22.8524 6.16889 22.8347 6.4 22.7817 6.63111C22.4988 8 21.3852 9.06667 20.0063 9.28H17.2132V4.26667H14.7383V11.7689H20.1654H20.2008C22.7994 11.4489 24.903 9.40445 25.2742 6.79111C25.3096 6.50667 25.345 6.22222 25.345 5.92C25.345 5.65333 25.3273 5.36889 25.2742 5.10222Z" fill="white"/>
<path d="M32.1507 0.0711113C28.9334 0.0711113 26.3348 2.70222 26.3348 5.92C26.3348 9.15556 28.9334 11.7689 32.1507 11.7689C35.3504 11.7689 37.9667 9.15556 37.9667 5.92C37.9667 2.70222 35.3504 0.0711113 32.1507 0.0711113ZM35.5272 5.92C35.5272 7.80444 34.0069 9.33333 32.1507 9.33333C30.2769 9.33333 28.7566 7.80444 28.7566 5.92C28.7566 4.05333 30.2769 2.52444 32.1507 2.52444C34.0069 2.52444 35.5272 4.05333 35.5272 5.92Z" fill="white"/>
<path d="M39.5539 4.72889V6.75556V11.7689H42.0288V6.75556H48.9408V4.26667H39.5539V4.72889ZM49.9838 2.52444V0.0355562H39.5539V2.52444H49.9838Z" fill="white"/>
<path d="M48.6386 11.0756L48.2674 11.7689H51.3786L51.5024 11.5378L54.0303 6.93333L52.4747 4.12444L48.6386 11.0756ZM61.4019 11.0756L56.4521 2.09778L55.4268 0.24889L55.3208 0H54.7197L54.596 0.24889L53.5884 2.09778L53.4646 2.32889L55.0202 5.15556L55.0556 5.22667L56.2047 7.30667L58.5381 11.5378L58.6618 11.7689H61.7731L61.4019 11.0756Z" fill="white"/>
<path d="M63.4028 0.0177786V11.7689H65.8777V0.0177786H63.4028Z" fill="white"/>
<path d="M67.5788 10.5244C67.5788 9.97926 67.7262 9.6 68.0208 9.38667C68.3154 9.16148 68.6749 9.04889 69.0991 9.04889C69.5116 9.04889 69.8652 9.16148 70.1598 9.38667C70.4544 9.6 70.6017 9.97926 70.6017 10.5244C70.6017 11.0459 70.4544 11.4252 70.1598 11.6622C69.8652 11.8874 69.5116 12 69.0991 12C68.6749 12 68.3154 11.8874 68.0208 11.6622C67.7262 11.4252 67.5788 11.0459 67.5788 10.5244Z" fill="white"/>
<path d="M76.8447 4.28444L77.1452 4.96L77.8523 6.50667L77.9938 6.79111H80.8752V9.28H77.7463C76.0315 9.03111 74.7411 7.59111 74.7411 5.92C74.7411 4.23111 76.0315 2.79111 77.7463 2.54222H83.3324V0.0533337H78.2589C76.6679 0.0533337 75.183 0.657779 74.0693 1.74222C72.9203 2.86222 72.3016 4.33778 72.3016 5.92C72.3016 7.50222 72.9203 8.97778 74.0693 10.08C75.183 11.1822 76.6679 11.7689 78.2589 11.7689H83.3678V6.79111V4.28444H76.8447Z" fill="white"/>
<path d="M89.4769 4.28444L89.7775 4.96L90.4846 6.50667L90.626 6.79111H93.5074V9.28H90.3785C88.6638 9.03111 87.3733 7.59111 87.3733 5.92C87.3733 4.23111 88.6638 2.79111 90.3785 2.54222H95.9646V0.0533337H90.8912C89.3002 0.0533337 87.8152 0.657779 86.7015 1.74222C85.5525 2.86222 84.9338 4.33778 84.9338 5.92C84.9338 7.50222 85.5525 8.97778 86.7015 10.08C87.8152 11.1822 89.3002 11.7689 90.8912 11.7689H96V6.79111V4.28444H89.4769Z" fill="white"/>
</svg>`)

const StatItem: React.FC<{
  label: string
  value: string
  spacing?: boolean
}> = ({ label, value, spacing }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginRight: spacing ? 24 : 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 16,
          fontWeight: 300,
          lineHeight: '16px',
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 28,
          fontWeight: 500,
          lineHeight: '28px',
        }}
      >
        {value}
      </div>
    </div>
  )
}

export const levels: FastifyPluginAsync = async (server) => {
  server.get<{
    Params: Static<typeof schema>
  }>(
    '/levels/:id',
    {
      schema: {
        params: schema,
      },
    },
    async (req, reply) => {
      if (isNaN(Number(req.params.id)))
        return reply.status(400).send('Invalid ID')

      const { data: level } = await api.get<Level>(`/levels/${req.params.id}`)

      let difficultyIcon = difficultyIconCache.get(level.difficulty)

      if (!difficultyIcon) {
        difficultyIcon = loadDifficultyIcon(level.difficulty)
        difficultyIconCache.set(level.difficulty, difficultyIcon)
      }

      const tags: string[] = []
      const highlightedTagUrls: string[] = []

      const tagIds = level.tags.map((x) => `${x.id}`)

      if (level.epilepsyWarning) {
        tagIds.push('SW')
      }

      let length = 'Medium'

      if (level.difficulty === 0.1) {
        length = 'Short'
      } else if (level.tags.some((x) => x.id === 11)) {
        length = 'Long'
      }

      for (const id of tagIds) {
        if (excludedTags.includes(id)) continue

        let tagIcon = tagIconCache.get(id)

        if (!tagIcon) {
          tagIcon = loadTagIcon(id)
          tagIconCache.set(id, tagIcon)
        }

        if (highlightedTags.includes(id)) {
          highlightedTagUrls.push(await tagIcon)
        } else {
          tags.push(await tagIcon)
        }
      }

      tags.push(...highlightedTagUrls)

      const svg = await satori(
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            fontFamily: 'Quicksand, MPlusRounded1c',
            whiteSpace: 'nowrap',
          }}
        >
          <img
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            src={`https://i.ytimg.com/vi/${getYoutubeVideoId(
              level.video
            )}/original.jpg`}
            width="100%"
            alt="thumbnail"
          />
          {tags.length ? (
            <div
              style={{
                position: 'absolute',
                right: 28,
                top: 28,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                borderRadius: 12,
                padding: '16px 30px',
                color: '#fff',
                display: 'flex',
              }}
            >
              {tags.map((x, i) => (
                <img
                  alt="icon"
                  style={{
                    marginLeft: i ? 8 : 0,
                  }}
                  src={x}
                  key={i}
                  width={28}
                  height={28}
                />
              ))}
            </div>
          ) : null}
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              width: '100%',
              position: 'absolute',
              left: 0,
              bottom: 0,
              display: 'flex',
              color: '#fff',
              paddingTop: 16,
              paddingBottom: 16,
              paddingRight: 30,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 106,
                alignItems: 'center',
                letterSpacing: '-0.011em',
              }}
            >
              <img
                src={await difficultyIcon}
                width={48}
                height={48}
                alt="difficulty"
              />
              <div
                style={{
                  display: 'flex',
                  fontWeight: 400,
                  fontSize: 14,
                  marginTop: 5,
                  opacity: 0.8,
                }}
              >
                ID {level.id}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                width: 0,
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 500,
                  lineHeight: '28px',
                  overflow: 'hidden',
                  width: '100%',
                  textOverflow: 'ellipsis',
                  paddingRight: 32,
                }}
              >
                {level.title}
              </div>
              <div style={{ marginTop: 4, display: 'flex' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: 16,
                    fontWeight: 300,
                    opacity: 0.6,
                    lineHeight: '16px',
                  }}
                >
                  <div>Music By</div>
                  <div style={{ marginTop: 4 }}>Level By</div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: '16px',
                    marginLeft: 4,
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    {level.music.artists.map((x) => x.name).join(' & ')}
                  </div>
                  <div style={{ marginTop: 4, display: 'flex' }}>
                    {level.creators.map((x) => x.name).join(' & ')}
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                height: '100%',
                width: 0,
                borderWidth: 1,
                borderColor: '#fff',
                borderStyle: 'solid',
                opacity: 0.6,
                marginRight: 28,
              }}
            />
            {/* Right area */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Level Meta */}
              <div
                style={{
                  height: 44,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%',
                }}
              >
                <StatItem spacing label="Song Length" value={length} />
                <StatItem
                  spacing
                  label="BPM"
                  value={`${
                    level.music.minBpm === level.music.maxBpm
                      ? level.music.minBpm
                      : `${level.music.minBpm} - ${level.music.maxBpm}`
                  }`}
                />
                <StatItem label="Tiles" value={`${level.tiles}`} />
              </div>
              {/* Timestamp / Logo */}
              <div
                style={{
                  display: 'flex',
                  marginTop: 11,
                  opacity: 0.6,
                  alignItems: 'center',
                }}
              >
                <div
                  style={{ display: 'flex', marginRight: 10, fontWeight: 500 }}
                >
                  As of{' '}
                  {dayjs().tz('Asia/Seoul').format('YYYY. MM. DD. HH:mm (KST)')}
                </div>
                <img width="96px" height="12px" src={logo} alt="logo" />
              </div>
            </div>
          </div>
        </div>,
        {
          width: 960,
          height: 540,
          fonts,
        }
      )

      const buffer = (await renderAsync(Buffer.from(svg))).asPng()

      return reply.header('Content-Type', 'image/png').send(buffer)
    }
  )
}
