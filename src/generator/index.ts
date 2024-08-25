import React from 'react'
import { Level } from '../types.js'
import { api, satoriFonts } from '../utils.js'
import { LevelImage } from './templates/LevelImage.js'
import satori from 'satori'

export const generateSVG = async (id: number): Promise<string> => {
  const { data: level } = await api.get<Level>(`/levels/${id}`)

  const el = React.createElement(LevelImage, {
    level,
  })

  const result = await satori(el, {
    debug: !!process.env.DEBUG,
    width: 960,
    height: 540,
    fonts: satoriFonts,
  })

  return result
}
