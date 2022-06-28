import React from 'react'
import './directory-item.styles.scss'

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category
  return (
    <div className='directory-item-container' style={{
      backgroundImage: `url(${imageUrl})`
    }}>
      <h2>{title}</h2>
      <p>Shop Now</p>
    </div>
  )
}

export default DirectoryItem