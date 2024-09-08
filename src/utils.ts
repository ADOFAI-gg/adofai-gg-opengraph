import path from 'path'
import { fileURLToPath } from 'url'
import Axios from 'axios'
import { Font } from 'satori'
import { readFile } from 'fs/promises'
import { Level } from './types.js'

export const resourcesDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../resources',
)

export const fontsDir = path.join(resourcesDir, 'fonts')
const ibmPlexSansKRDir = path.join(fontsDir, 'IBMPlexSansKR')
const ibmPlexSansJPDir = path.join(fontsDir, 'IBMPlexSansJP')

export const satoriFonts: Font[] = [
  {
    name: 'IBM Plex Sans KR',
    data: await readFile(
      path.join(ibmPlexSansKRDir, 'IBMPlexSansKR-Regular.ttf'),
    ),
    weight: 400,
    style: 'normal',
  },
  {
    name: 'IBM Plex Sans KR',
    data: await readFile(
      path.join(ibmPlexSansKRDir, 'IBMPlexSansKR-Medium.ttf'),
    ),
    weight: 500,
    style: 'normal',
  },
  {
    name: 'IBM Plex Sans KR',
    data: await readFile(path.join(ibmPlexSansKRDir, 'IBMPlexSansKR-Bold.ttf')),
    weight: 700,
    style: 'normal',
  },

  // JP
  {
    name: 'IBM Plex Sans JP',
    data: await readFile(
      path.join(ibmPlexSansJPDir, 'IBMPlexSansJP-Regular.ttf'),
    ),
    weight: 400,
    style: 'normal',
  },
  {
    name: 'IBM Plex Sans JP',
    data: await readFile(
      path.join(ibmPlexSansJPDir, 'IBMPlexSansJP-Medium.ttf'),
    ),
    weight: 500,
    style: 'normal',
  },
  {
    name: 'IBM Plex Sans JP',
    data: await readFile(path.join(ibmPlexSansJPDir, 'IBMPlexSansJP-Bold.ttf')),
    weight: 700,
    style: 'normal',
  },
]

export const api = Axios.create({
  baseURL: process.env.API_ENDPOINT + '/api/v1',
})

const youtubeIdRegex =
  /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/

export const getYoutubeVideoId = (url: string) =>
  youtubeIdRegex.exec(url)?.[1] ?? ''

export const getDifficulty = (level: Level) => {
  if (level.censored) return -2

  return level.difficulty
}
