// src/routes/+layout.server.ts
import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
  const { session, user } = await safeGetSession()
console.log('session', session)
 

  return {
    session,
    user,
    cookies: cookies.getAll(),
  }
}
