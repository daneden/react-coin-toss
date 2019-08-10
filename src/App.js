import React from "react"

const { useEffect, useState } = React

function App() {
  const [side, setSide] = useState(1)
  const [heads, setHeads] = useState(0)
  const [tails, setTails] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const tossed = heads + tails

  const tossCoin = () => {
    const landedOn = Math.round(Math.random())

    if (landedOn === 1) {
      setHeads(heads + 1)
    } else {
      setTails(tails + 1)
    }

    setSide(landedOn)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        tossCoin()
      }
    }, 10)
    return () => clearInterval(interval)
  })

  return (
    <div>
      <p>The coin has been tossed {tossed} times.</p>
      <p>It landed on {side === 1 ? "heads" : "tails"}</p>
      <ul>
        <li>
          <label htmlFor="heads">Heads: {heads}</label>
          <meter id="heads" value={heads} max={tossed} />
        </li>
        <li>
          <label htmlFor="tails">Tails: {tails}</label>
          <meter id="tails" value={tails} max={tossed} />
        </li>
      </ul>
      <button onClick={() => setIsPaused(!isPaused)}>
        {!isPaused ? "Pause" : "Continue"}
      </button>
      {isPaused && <button onClick={tossCoin}>Toss coin</button>}
    </div>
  )
}

export default App
