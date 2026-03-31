import { BrowserRouter, Route, Routes, useSearchParams } from 'react-router-dom'

import { ROUTES } from './lib/routes'
import { CategoriesPage } from './pages/CategoriesPage'
import { LearningPage } from './pages/LearningPage'
import { SplashPage } from './pages/SplashPage'

function LearningRoutePage() {
  const [searchParams] = useSearchParams()
  const sourceType = searchParams.get('type')

  return (
    <LearningPage
      key={sourceType ?? 'all'}
      sourceType={sourceType === 'kpop' || sourceType === 'kdrama' ? sourceType : undefined}
    />
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<SplashPage />} />
      <Route path={ROUTES.learn} element={<LearningRoutePage />} />
      <Route path={ROUTES.categories} element={<CategoriesPage />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
