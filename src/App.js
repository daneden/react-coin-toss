import React from "react"

const { useState } = React

function App() {
  const [side, setSide] = useState(1)
  const [tossed, setTossed] = useState(0)

  const tossCoin = () => {
    const landedOn = Math.round(Math.random())
    setSide(landedOn)
    setTossed(tossed + 1)
  }

  return (
    <div>
      <p>The coin has been tossed {tossed} times.</p>
      <p>It landed on {side === 1 ? "heads" : "tails"}</p>
      <button onClick={tossCoin}>Toss coin</button>
    </div>
  )
}

export default App
