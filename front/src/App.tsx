import { createRouter, RouterProvider } from "@tanstack/react-router"
import { ThemeProvider } from "./components/providers/theme-provider"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { routeTree } from "./routeTree.gen"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
const queryClient = new QueryClient()

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <TanStackRouterDevtools router={router} />
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default App