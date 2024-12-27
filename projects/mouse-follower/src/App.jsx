import { useEffect, useState } from 'react'

const FollowMouse = () => {

  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // [] solo se ejecuta una vez cuando se monta el componente
  // [enabled] se ejecuta cuando cambia enabled y cdo se monta el componente (podes tener + de 1 dependencia)
  // undefined se ejecuta cada vez que se renderiza el componente

  // pointer move
  useEffect(() => {
    console.log('Effect', { enabled })

    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('handleMove', { clientX, clientY })
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }
    // clean up 
    // cuando el componente se desmonta (cdo App deja de ejecutarse)
    // se ejecuta cuando cambian las dependencias antes de ejecutar el efecto de nuevo 
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  //change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)
    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])


  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        border: '3px solid blue',
        opacity: 0.7,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}


function App() {
  const [mounted, setMounted] = useState(true)
  return (
    <main>
      {mounted && <FollowMouse />}
      <button onClick={() => setMounted(!mounted)}>
        Toggle mounted FollowMouse component
      </button>
    </main>
  )
}

export default App
