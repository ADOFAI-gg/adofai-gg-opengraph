import React from 'react'
import { Level } from '../../types.js'
import { getDifficulty } from '../../utils.js'
import { icons } from '../../icons.js'
import dayjs from 'dayjs'

const ignoredTags: string[] = ['11', '1']
const warningTags: string[] = ['25']
const dangerTags: string[] = ['4', 'sw']

const LevelStat: React.FC<{
  label: React.ReactNode
  value: React.ReactNode
}> = ({ label, value }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: 14,
          fontWeight: 400,
          display: 'flex',
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: 'white',
          fontSize: 26,
          fontWeight: 500,
          height: 32,
          lineHeight: '32px',
          display: 'flex',
        }}
      >
        {value}
      </div>
    </div>
  )
}

export const LevelDetailsArea: React.FC<{ level: Level }> = ({ level }) => {
  const difficulty = getDifficulty(level)

  const difficultyIcon = `https://raw.githubusercontent.com/ADOFAI-gg/Adofai-gg-assets/main/difficultyIcons/${difficulty}.svg`

  const bpmStr = () => {
    if (level.music.minBpm === 0 && level.music.maxBpm === 0) {
      return '?'
    }

    if (level.music.minBpm !== level.music.maxBpm) {
      return `${level.music.minBpm} - ${level.music.maxBpm}`
    }

    return level.music.minBpm
  }

  const tilesStr = () => {
    return level.tiles.toLocaleString()
  }

  const lengthStr = () => {
    let length = 'Medium'

    if (level.difficulty === 0.1) {
      length = 'Short'
    } else if (level.tags.some((x) => x.id === 11)) {
      length = 'Long'
    }

    return length
  }

  const timestamp = () => {
    const now = dayjs().tz('Asia/Seoul')

    return now.format('YYYY. MM. DD. HH:mm KST')
  }

  const tagIds = level.tags
    .map((x) => x.id.toString())
    .filter((x) => !ignoredTags.includes(x))
  if (level.epilepsyWarning) tagIds.push('sw')

  return (
    <div style={{ display: 'flex', padding: 32, color: 'white' }}>
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: 72,
          background: 'black',
          borderRadius: 12,
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 18,
            alignItems: 'center',
            position: 'absolute',
            left: 16,
            top: 0,
            height: '100%',
          }}
        >
          <img src={difficultyIcon} width={48} height={48} />
          <LevelStat label="Length" value={lengthStr()} />
          <LevelStat label="BPM" value={bpmStr()} />
          <LevelStat label="Tiles" value={tilesStr()} />
        </div>

        {/* CENTER */}
        <div
          style={{
            position: 'absolute',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            left: '50%',
            top: 0,
            justifyContent: 'center',
            alignItems: 'center',
            transform: `translateX(-50%)`,
            gap: 4,
          }}
        >
          <div style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.2)' }}>
            {timestamp()}
          </div>
          <img src={icons.logo} width={111} height={14} />
        </div>

        {/* RIGHT */}
        <div
          style={{
            position: 'absolute',
            right: 16,
            display: 'flex',
            gap: 8,
            alignItems: 'center',
          }}
        >
          {tagIds.map((x, i) => (
            <img
              key={i}
              src={`https://raw.githubusercontent.com/ADOFAI-gg/Adofai-gg-assets/main/tagIcons/${x}.svg`}
              width={32}
              height={32}
              style={
                dangerTags.includes(x)
                  ? {
                      filter: `invert(48%) sepia(70%) saturate(5132%) hue-rotate(332deg) brightness(97%) contrast(97%)`,
                    }
                  : warningTags.includes(x)
                    ? {
                        filter: `invert(75%) sepia(29%) saturate(638%) hue-rotate(6deg) brightness(112%) contrast(106%)`,
                      }
                    : {}
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}
