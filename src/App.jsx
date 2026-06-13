import { AppLayout } from "@/layouts"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ResultsPage, StartPage, WelcomePage } from "@/pages"

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <WelcomePage />
      },
      {
        path: 'quiz',
        element: <StartPage />
      },
      {
        path: 'results',
        element: <ResultsPage />
      },
    ]
  }
])

export const App = () => {
  return (
    <RouterProvider router={router} />
  )
}
