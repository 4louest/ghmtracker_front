
import {Tabs, TabsContent} from "@/components/ui/tabs";
import * as React from "react";
import {Button} from "@/components/ui/button";
import {IconCirclePlusFilled} from "@tabler/icons-react";
import {columns, schema} from "@/components/activity-column";
import {ActivityTable} from "@/components/activity-table";
import Link from "next/link";

export async function getActivities(): Promise<typeof schema[]> {
    const data = await fetch('http://localhost:8080/activities')
    return data.json()
}

export default async function Page() {
    const activities = await getActivities()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    activities.sort((a, b) => new Date(b.dateFrom) - new Date(a.dateFrom));

    return <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <Tabs
            defaultValue="outline"
            className="w-full flex-col justify-start gap-6">
            <div className="flex items-center justify-between px-4 lg:px-6">
                <Button asChild><Link href="/activities/create"><IconCirclePlusFilled/> Ajouter</Link></Button>
                <div className="flex items-center gap-2">
                </div>
            </div>
            <TabsContent
                value="past-performance"
                className="flex flex-col px-4 lg:px-6">
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed">
                    <ActivityTable columns={columns} data={activities}/>
                </div>
            </TabsContent>
        </Tabs>
        <ActivityTable columns={columns} data={activities}/>
    </div>
}
