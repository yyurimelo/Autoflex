import { createRouter, RouterProvider } from "@tanstack/react-router"
import { ThemeProvider } from "./components/providers/theme-provider"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { routeTree } from "./routeTree.gen"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createHttp } from "./config/axios-config"
import { env } from "./env"

import { Provider } from "react-redux"
import { store } from "./store"
import { Toaster } from "./components/ui/sonner"

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
            <Toaster />
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                    <TanStackRouterDevtools router={router} />
                </QueryClientProvider>
            </Provider>
        </ThemeProvider>
    )
}

export default App