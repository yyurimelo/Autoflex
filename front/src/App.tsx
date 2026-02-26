import { ThemeProvider } from "./components/providers/theme-provider"


function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <h1>teste</h1>
        </ThemeProvider>
    )
}

export default App