import {ChartAreaInteractive} from "@/components/chart-area-interactive"
import {SectionCards} from "@/components/section-cards"
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
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards/>
            <div className="px-4 lg:px-6">
                <ChartAreaInteractive/>
            </div>
            <ActivityTable columns={columns} data={activities}/>
        </div>
    )
}
