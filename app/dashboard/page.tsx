import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {ActivityTable} from "@/components/activity-table";
import {columns, schema} from "@/components/activity-column";

async function getData(): Promise<typeof schema[]> {
  const data = await fetch('http://localhost:8080/activities')
  return data.json()
}

export default async function Page() {
  const activities = await getData()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  activities.sort((a, b) => new Date(b.dateFrom) - new Date(a.dateFrom));
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <ActivityTable columns={columns} data={activities} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
