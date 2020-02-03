import React from "react"

const { useEffect, useRef, useState } = React

function App() {
  const [side, setSide] = useState(1)
  const prevSide = useRef(side)
  const [heads, setHeads] = useState(0)
  const [tails, setTails] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const [currentStretch, setCurrentStretch] = useState(0)
  const [headsRecord, setHeadsRecord] = useState(0)
  const [tailsRecord, setTailsRecord] = useState(0)

  const tossed = heads + tails

  const tossCoin = () => {
    const landedOn = Math.round(Math.random())

    if (landedOn !== prevSide.current) {
      switch (landedOn) {
        case 0:
          setTailsRecord(Math.max(currentStretch, tailsRecord))
          break
        case 1:
        default:
          setHeadsRecord(Math.max(currentStretch, headsRecord))
          break
      }
      setCurrentStretch(1)
      prevSide.current = landedOn
    } else {
      setCurrentStretch(currentStretch + 1)
    }

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
      <hr />
      <h2>Records</h2>
      <ul>
        <li>Heads: {headsRecord}</li>
        <li>Tails: {tailsRecord}</li>
      </ul>
    </div>
  )
}

export default App
