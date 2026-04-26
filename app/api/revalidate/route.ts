import { revalidatePath } from 'next/cache'

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('secret') !== process.env.REVALIDATE_TOKEN) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  revalidatePath('/', 'layout')
  return Response.json({ revalidated: true, at: new Date().toISOString() })
}
