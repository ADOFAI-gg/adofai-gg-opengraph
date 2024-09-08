import React from 'react'
import { Level } from '../../types.js'
import { icons } from '../../icons.js'

const LevelAuthors: React.FC<{ icon: string; members: string[] }> = ({
  icon,
  members,
}) => {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      <img src={icon} width={18} height={18} />
      <div>{members.join(' & ')}</div>
    </div>
  )
}

export const LevelMetadataArea: React.FC<{ level: Level }> = ({ level }) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: 440,
        bottom: 0,
        color: 'white',
        background:
          'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%)',
        display: 'flex',
        alignItems: 'flex-end',
        padding: 32,
      }}
    >
      <div
        style={{
          display: 'flex',
          filter:
            'drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.4)) drop-shadow(0px 0px 32px rgba(0, 0, 0, 0.6))',
          gap: 4,
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontWeight: 500,
            fontSize: 18,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <LevelAuthors
            icon={icons.music}
            members={level.music.artists.map((x) => x.name)}
          />
          <LevelAuthors
            icon={icons.tile}
            members={level.creators.map((x) => x.name)}
          />
        </div>
        <div
          style={{
            display: 'block',
            fontSize: 48,
            fontWeight: 700,
            lineClamp: '2 "..."',
          }}
        >
          {level.title}
        </div>
      </div>
    </div>
  )
}
