import React, { useState } from 'react'

import Show from './Show/Show'
import Trends from './Trends/Trends'
import './Banner.css'

import trendDataBase from './trendData'
import Colors from './Colors/Colors'

const Banner = () => {
  const [trendProductId, setTrendProductId] = useState(0)
  const [showPageId, setShowPageId] = useState(1)
  const [trendData, setTrendData] = useState(trendDataBase)

  const changeTrendProduct = (id) => {
    setShowPageId(1)
    setTrendProductId(id - 1)
  }

  const changeShowPage = (action) => {
    if (action === "add") {
      if (trendData[trendProductId].titles.length > showPageId) {
        const newPage = showPageId + 1;
        setShowPageId(newPage)
      }
      else {
        setShowPageId(1)
      }
    }
    else if (action === "sub") {
      if (showPageId > 1) {
        const newPage = showPageId - 1;
        setShowPageId(newPage)
      }
      else {
        setShowPageId(trendData[trendProductId].titles.length)
      }
    }
  }

  const changeColor = (id) => {
    const newData = [...trendData]
    const colors = newData[trendProductId].colors
    colors.forEach(color => {
      (color.id === id) ? color.selected = true : color.selected = false
    });
    newData[trendProductId].colors = colors
    setTrendData(newData)
  }

  return (
    <div className='banner'>
      <Trends
        trendData={trendData}
        trendProductId={trendProductId}
        changeTrendProduct={changeTrendProduct}
      />
      <Show
        trendData={trendData}
        showPageId={showPageId}
        changeShowPage={changeShowPage}
        trendProductId={trendProductId}
      >
        <Colors
          trendProductId={trendProductId}
          trendData={trendData}
          changeColor={changeColor}
        />
      </Show>
    </div>
  )
}

export default Banner