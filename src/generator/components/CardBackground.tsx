import React from 'react'

export const CardBackground: React.FC<{ url: string }> = ({ url }) => {
  return (
    <img
      width="100%"
      src={url}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}
