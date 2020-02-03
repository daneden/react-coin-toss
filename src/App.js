import React from "react"

const { useCallback, useEffect, useRef, useState } = React

function App() {
  const [side, setSide] = useState(1)
  const prevSide = useRef(side)
  const [heads, setHeads] = useState(0)
  const [tails, setTails] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [updateRate, setUpdateRate] = useState(210)

  const [currentStretch, setCurrentStretch] = useState(0)
  const [headsRecord, setHeadsRecord] = useState(0)
  const [tailsRecord, setTailsRecord] = useState(0)

  const tossed = heads + tails

  const tossCoin = useCallback(() => {
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
  }, [
    currentStretch,
    heads,
    headsRecord,
    prevSide,
    setCurrentStretch,
    setHeads,
    setHeadsRecord,
    setTails,
    setTailsRecord,
    tails,
    tailsRecord,
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        tossCoin()
      }
    }, 10000 / updateRate)
    return () => clearInterval(interval)
  }, [isPaused, tossCoin, updateRate])

  return (
    <div>
      <h1>The coin has been tossed {tossed} times.</h1>
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
      <label>
        Coin Tossing Rate
        <input
          max={1010}
          min={10}
          onChange={e => setUpdateRate(e.currentTarget.value)}
          step={100}
          type="range"
          value={updateRate}
        />
      </label>
      <div className="buttonGroup">
        <button onClick={() => setIsPaused(!isPaused)}>
          {!isPaused ? "Pause" : "Continue"}
        </button>
        {isPaused && <button onClick={tossCoin}>Toss coin</button>}
      </div>
      <h2>Records</h2>
      <ul>
        <li>
          Most Consecutive Heads: <strong>{headsRecord}</strong>
        </li>
        <li>
          Most Consecutive Tails: <strong>{tailsRecord}</strong>
        </li>
      </ul>
    </div>
  )
}

export default App
