import { createClient } from '@/utils/supabase/server'
import { cookies } from "next/headers";
import ClientPage from "./TestClientPage";

export default async function page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <ClientPage user={user&&user}/>
  )
}