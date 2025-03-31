import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {activityTypeSchema} from "@/app/activities/create/activityTypeSchema";
import {createActivity} from "@/app/activities/actions";

export async function getActivityTypes(): Promise<typeof activityTypeSchema[]> {
    const data = await fetch('http://localhost:8080/activity-types')
    return data.json()
}

export default async function Page() {
    const activityTypes = await getActivityTypes()

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <Card className="w-[750px]">
                <CardHeader>
                    <CardTitle>Nouvelle activité</CardTitle>
                    <CardDescription>Enregistrer une nouvelle activité</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={createActivity}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Libellé</Label>
                                <Input  id="name" placeholder="Libellé de l'activité" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="activityType">Type d&apos;activité</Label>
                                <Select>
                                    <SelectTrigger id="activityType">
                                        <SelectValue placeholder="Selectionner" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        {activityTypes.map((a) => (
                                            <SelectItem key={a.id} value={a.name}>{a.name}</SelectItem>
                                        ))}
                                        <SelectItem value="AMATEUR">Amateur</SelectItem>
                                        <SelectItem value="PROFESIONNEL">Professionnel</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="socialContext">Contexte social</Label>
                                <Select>
                                    <SelectTrigger id="socialContext">
                                        <SelectValue placeholder="Selectionner" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="AMATEUR">Amateur</SelectItem>
                                        <SelectItem value="PROFESIONNEL">Professionnel</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Date de début</Label>
                                <Input  id="dateFrom" type="date" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Date de fin</Label>
                                <Input  id="dateTo" type="date" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="commentMeteo">Météo</Label>
                                <Textarea id="commentMeteo" placeholder="Commentaire météo" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="commentConditions">Conditions</Label>
                                <Textarea id="commentConditions" placeholder="Commentaire conditions" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="commentObservations">Observations</Label>
                                <Textarea id="commentObservations" placeholder="Commentaire observations" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="estimatedDuration">Durée estimée</Label>
                                <Input  id="estimatedDuration" type="text" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="realDuration">Durée réelle</Label>
                                <Input  id="realDuration" type="text" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Annuler</Button>
                    <Button type="submit">Enregistrer</Button>
                </CardFooter>
            </Card>
        </div>
        </div>
    )
}
