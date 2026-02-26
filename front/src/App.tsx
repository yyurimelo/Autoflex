import { createRouter, RouterProvider } from "@tanstack/react-router"
import { ThemeProvider } from "./components/providers/theme-provider"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { routeTree } from "./routeTree.gen"

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
            <TanStackRouterDevtools router={router} />
        </ThemeProvider>
    )
}

export default App