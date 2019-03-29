import React, { memo } from "react"
import GatsbyImage from "gatsby-image"
import { FixedSizeGrid as Grid, areEqual } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

import "./cards.css"

const Cell = memo(({ columnIndex, rowIndex, style, data }) => {
  const { cards, columnCount } = data
  const singleColumnIndex = columnIndex + rowIndex * columnCount
  const card = cards[singleColumnIndex]

  return (
    <div style={style}>
      {card && (
        <div
          key={card.dbfId}
          style={{
            width: "286px",
            height: "395px",
            display: "inline-block",
          }}
        >
          <GatsbyImage
            title={card.name}
            fluid={card.image.childImageSharp.fluid}
          />
        </div>
      )}
    </div>
  )
}, areEqual)

const Cards = ({ cards }) => (
  <div
    style={{
      minHeight: "100vh",
      backgroundColor: "#d6cae2",
      marginTop: "2em",
      position: "sticky",
      top: "0px",
    }}
  >
    <AutoSizer defaultWidth={1920} defaultHeight={1080}>
      {({ width, height }) => {
        const cardWidth = 286
        const cardHeight = 395
        const columnCount = Math.floor(width / cardWidth)
        const rowCount = Math.ceil(cards.length / columnCount)
        return (
          <Grid
            className="grid"
            width={width}
            height={height}
            columnCount={columnCount}
            columnWidth={cardWidth}
            rowCount={rowCount}
            rowHeight={cardHeight}
            itemData={{ cards, columnCount }}
          >
            {Cell}
          </Grid>
        )
      }}
    </AutoSizer>
  </div>
)

export default Cards
