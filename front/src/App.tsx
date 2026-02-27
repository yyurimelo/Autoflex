import { createRouter, RouterProvider } from "@tanstack/react-router"
import { ThemeProvider } from "./components/providers/theme-provider"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { routeTree } from "./routeTree.gen"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createHttp } from "./config/axios-config"
import { env } from "./env"
import { Toaster } from "sonner"

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

createHttp(env.VITE_API_URL)

const queryClient = new QueryClient()

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <Toaster />
                <RouterProvider router={router} />
                <TanStackRouterDevtools router={router} />
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default App