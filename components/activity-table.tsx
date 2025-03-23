'use client'

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {z} from "zod";
import * as React from "react";
import {Tabs} from "@/components/ui/tabs";

export const schema = z.object({
    name: z.string(),
    socialContext: z.string(),
    // location: z.string(),
    dateFrom: z.date(),
    level: z.string(),
    type: z.object({
        id: z.number(),
        name: z.string(),
        color: z.string(),
    }),
})

export function ActivityTable({ data: initialData}: {
    data: z.infer<typeof schema>[]
}){
    const [data, setData] = React.useState(() => initialData)
    return (
        <Tabs
            defaultValue="outline"
            className="w-full flex-col justify-start gap-6"
        >
            <Table>
                <TableCaption>Activités récentes</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Titre</TableHead>
                        <TableHead>Contexte</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Niveau de difficulté</TableHead>
                        <TableHead>Nature</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((activity, k) => (
                        <TableRow key={k}>
                            <TableCell className="font-medium">{activity.name}</TableCell>
                            <TableCell>{activity.socialContext}</TableCell>
                            <TableCell>{new Date(activity.dateFrom).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">{activity.level}</TableCell>
                            <TableCell>{activity.type.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Tabs>
    )
}
