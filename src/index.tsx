import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routesConfig } from './config/routes.tsx'

const router = createBrowserRouter(routesConfig)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
