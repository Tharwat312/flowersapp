"use server"
export async function RegisterAction(values: FormValues) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APIBaseURL}/auth/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    })
    const payload = await response.json();
    if ('error' in payload) {
        throw new Error(payload.error)
    }
    return values ;
}
