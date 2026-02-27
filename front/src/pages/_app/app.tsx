import { cn } from '@/lib/utils';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { MessageSquare, Package } from 'lucide-react';

export const Route = createFileRoute('/_app/app')({
  component: SettingsLayout,
})

interface TabButtonProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

function TabButton({ to, icon: Icon, children }: TabButtonProps) {

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-sm",
        "hover:bg-accent/30 hover:text-accent-foreground",
        "bg-background/80"
      )}
      activeProps={{
        className: "bg-muted/50"
      }}
    >
      <Icon className="w-4 h-4" />
      <span>{children}</span>
    </Link>
  )
}

function SettingsLayout() {

  return (
    <div className="min-h-screen flex items-center justify-center p-4 lg:p-6">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-4">
          <nav className="flex flex-row lg:flex-col lg:w-64 lg:shrink-0 overflow-x-auto lg:overflow-x-visible">
            <div className='border rounded-md p-2 space-y-1 w-full'>
              <TabButton to="/app/product" icon={Package}>
                Produtos
              </TabButton>
              <TabButton to='/sections/raw-material' icon={MessageSquare}>
                Matéria prima
              </TabButton>
            </div>
          </nav>

          <main className="flex-1 min-w-0 border rounded-md p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}