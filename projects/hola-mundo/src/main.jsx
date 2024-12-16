import { StrictMode } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import  './index.css'
import { App } from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
// const root = ReactDOM.createRoot(document.getElementById
//   ('root'))
  
//   root.render(
//   <App />
//   );

const root = createRoot(document.querySelector("#root"))
root.render(<App/>)