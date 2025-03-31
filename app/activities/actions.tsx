'use server'
import { redirect } from 'next/navigation'

export async function createActivity(formData: FormData) {
    // Create a new activity
    // ...

    // Redirect to the new post
    redirect(`/activities`)
}
