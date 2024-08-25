import React from 'react'
import { Level } from '../../types.js'
import { CardBackground } from '../components/CardBackground.js'
import { getYoutubeVideoId } from '../../utils.js'

export const LevelImage: React.FC<{
  level: Level
}> = ({ level }) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        fontFamily: "'IBM Plex Sans KR', 'IBM Plex Sans JP'",
      }}
    >
      <CardBackground
        url={`https://i.ytimg.com/vi/${getYoutubeVideoId(level.video)}/original.jpg`}
      />
    </div>
  )
}
