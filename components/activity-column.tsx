'use client'

import {z} from "zod";
import {ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge";

export const schema = z.object({
    id: z.number(),
    name: z.string(),
    socialContext: z.string(),
    // location: z.string(),
    dateFrom: z.date(),
    level: z.string(),
    activityType: z.object({
        id: z.number(),
        name: z.string(),
        color: z.string(),
    }),
})

export const columns: ColumnDef<typeof schema>[] = [
    {
        accessorKey: "name",
        header: "Titre",
    },
    {
        accessorKey: "nature",
        header: "Nature",
        cell: ({row}) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const activityType = row.original.activityType;
            return <Badge style={{backgroundColor: activityType.color}}>{activityType.name}</Badge>
        }
    },
    {
        accessorKey: "socialContext",
        header: "Contexte",
        cell: ({row}) => {
            return <Badge className="lowercase" variant={row.getValue('socialContext') === "amateur" ? "outline" : "secondary"}>
                {row.getValue('socialContext')}
            </Badge>
        }
    },
    {
        accessorKey: "dateFrom",
        header: () => <div className="text-right">Date</div>,
        cell: ({row}) => {
            return <div
                className="text-right font-medium">{new Date(row.getValue('dateFrom')).toLocaleDateString()}</div>
        }
    },
    {
        accessorKey: "level",
        header: "Niveau de difficulté",
    },
]
