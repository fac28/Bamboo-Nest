import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import UpdateForm from '@/components/form/UpdateProfile'
import PageContainer from '@/components/PageContainer'
import FormFieldAndLabel from '@/components/FormFieldAndLabel'

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const firstName = formData.get('First Name') as string
    const lastName = formData.get('Last Name') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    supabase
      .from('users')
      .upsert({
        id: data?.user?.id,
        first_name: firstName,
        last_name: lastName,
      })
      .select()

    return redirect('/login?message=Check email to continue sign in process')
  }

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user ? (
    <PageContainer>
      <div>
        <UpdateForm />
      </div>
    </PageContainer>
  ) : (
    <PageContainer>
      {/* <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2"> */}
      <div className="gap-2">
        <h1 className="mb-10 w-[80%] text-center mx-auto">
          Create an account{' '}
        </h1>
        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <FormFieldAndLabel
            htmlForInput="email"
            labelName="Email"
            inputType="email"
            inputName="email"
            inputPlaceholder="you@example.com"
            required
          />

          <FormFieldAndLabel
            htmlForInput="password"
            labelName="Password"
            inputType="password"
            inputName="password"
            inputPlaceholder="••••••••"
            required
          />

          <FormFieldAndLabel
            htmlForInput="First Name"
            labelName="First Name"
            inputType="text"
            inputName="First Name"
            inputPlaceholder="First Name"
            required
          />

          <FormFieldAndLabel
            htmlForInput="Last Name"
            labelName="Last Name"
            inputType="text"
            inputName="Last Name"
            inputPlaceholder="Last Name"
            required
          />

          <button
            formAction={signUp}
            className="px-4 py-2 mb-2 bg-primaryBlue text-white rounded-full"
          >
            Register
          </button>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </PageContainer>
  )
}
