import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createFileRoute } from '@tanstack/react-router';
import { Grid, Lightbulb } from 'lucide-react';
import { AssociationsGrid } from "./associations"
import { AssociationFilters } from './associations/-filters';
import { AssociationCreate } from './associations/-create';

export const Route = createFileRoute('/_app/app/associations/')({
  component: Associations,
  validateSearch: (search) => ({
    tab: (search.tab as string) ?? "grid",
  }),
})

function Associations() {
  const { tab } = Route.useSearch();
  const navigate = Route.useNavigate();

  const defaultTab = "grid";

  function handleChangeTab(name: string) {
    navigate({
      search: (prev) => ({
        ...prev,
        tab: name,
      }),
      replace: true,
    });
  }

  return (
    <>
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{tab === "grid" ? "Associações" : "Sugestões"}</h1>
          <span className="text-base text-muted-foreground">
            Segue abaixo a lista de {tab === "grid" ? "Associações" : "Sugestões"}.
          </span>
        </div>

        <div className="flex items-center justify-end gap-3">
          {tab === "grid" && (
            <AssociationFilters />
          )}
          <AssociationCreate />
        </div>
      </header>

      <Tabs defaultValue={"grid"} value={tab ?? defaultTab}>
        <ScrollArea className="grid">
          <TabsList>
            <TabsTrigger value="grid" onClick={() => handleChangeTab("grid")}>
              <Grid className="w-4 h-4 mr-2" />
              Grid
            </TabsTrigger>

            <TabsTrigger value="external" onClick={() => handleChangeTab("external")}>
              <Lightbulb className="w-4 h-4 mr-2" />
              Sugestões
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <TabsContent value="grid">
          <AssociationsGrid />
        </TabsContent>

        {/* <TabsContent value="external">
          <Suggestions  />
        </TabsContent> */}
      </Tabs>
    </>
  )
}
