import path from 'path'
import { fileURLToPath } from 'url'
import { SatoriOptions } from 'satori'
import { readFile } from 'fs/promises'
import 'dotenv/config'
import Axios from 'axios'

export const resourcesDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../resources'
)

export const fontsDir = path.join(resourcesDir, 'fonts')

export const api = Axios.create({
  baseURL: process.env.API_ENDPOINT + '/api/v1',
})

export const fonts: SatoriOptions['fonts'] = [
  {
    name: 'Quicksand',
    data: await readFile(
      path.join(fontsDir, 'Quicksand', 'Quicksand-Light.ttf')
    ),
    style: 'normal',
    weight: 300,
  },
  {
    name: 'Quicksand',
    data: await readFile(
      path.join(fontsDir, 'Quicksand', 'Quicksand-Regular.ttf')
    ),
    style: 'normal',
    weight: 400,
  },
  {
    name: 'Quicksand',
    data: await readFile(
      path.join(fontsDir, 'Quicksand', 'Quicksand-Medium.ttf')
    ),
    style: 'normal',
    weight: 500,
  },
  {
    name: 'MPlusRounded1c',
    data: await readFile(
      path.join(fontsDir, 'MPlusRounded1c', 'MPLUSRounded1c-Light.ttf')
    ),
    style: 'normal',
    weight: 300,
  },
  {
    name: 'MPlusRounded1c',
    data: await readFile(
      path.join(fontsDir, 'MPlusRounded1c', 'MPLUSRounded1c-Regular.ttf')
    ),
    style: 'normal',
    weight: 400,
  },
  {
    name: 'MPlusRounded1c',
    data: await readFile(
      path.join(fontsDir, 'MPlusRounded1c', 'MPLUSRounded1c-Medium.ttf')
    ),
    style: 'normal',
    weight: 500,
  },
  {
    name: 'NanumSquareRound',
    data: await readFile(
      path.join(fontsDir, 'NanumSquareRound', 'NanumSquareRoundL.ttf')
    ),
    style: 'normal',
    weight: 300,
  },
  {
    name: 'NanumSquareRound',
    data: await readFile(
      path.join(fontsDir, 'NanumSquareRound', 'NanumSquareRoundR.ttf')
    ),
    style: 'normal',
    weight: 400,
  },
  {
    name: 'NanumSquareRound',
    data: await readFile(
      path.join(fontsDir, 'NanumSquareRound', 'NanumSquareRoundB.ttf')
    ),
    style: 'normal',
    weight: 500,
  },
]

const youtubeIdRegex =
  /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/

export const getYoutubeVideoId = (url: string) =>
  youtubeIdRegex.exec(url)?.[1] ?? ''
