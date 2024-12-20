import { useEffect, useState } from "react"

function App() {

  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    console.log('Effect', { enabled })
  }, [enabled])

  const changeMouseStatus = () => setEnabled(!enabled)

  return (
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: 'translate(0px, 0px)'
      }}
      />
      <button onClick={changeMouseStatus}>
        {enabled ? 'Desactivar' : 'Desactivar'} seguir puntero
      </button>
    </main>
  )
}

export default App
