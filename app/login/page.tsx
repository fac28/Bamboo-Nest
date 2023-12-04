import Link from 'next/link'
import { redirect } from 'next/navigation'
import UpdateForm from '@/components/form/UpdateProfile'
import PageContainer from '@/components/PageContainer'
import FormFieldAndLabel from '@/components/form/FormFieldAndLabel'
// import WideBlueButton from '@/components/WideBlueButton'
// import BackButton from '@/components/BackButton'
import getUser from '@/utils/getUser'
import newClient from '@/utils/createNewClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Bamboo Nest',
}

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const { user } = await getUser()

  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = newClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/')
  }

  return user ? (
    <PageContainer>
      <div>
        <UpdateForm />
      </div>
    </PageContainer>
  ) : (
    <PageContainer>
      <h1 className="mb-10 w-[80%] text-center mx-auto">
        Welcome to Bamboo Nest
      </h1>
      <form
        aria-label="login to account"
        className="animate-in flex-1 flex flex-col w-full max-w-xl justify-center gap-2 text-foreground"
        action={signIn}
      >
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

        <button
          aria-label="login to account"
          className="px-4 py-2 mb-2 bg-primaryBlue text-white rounded-full"
        >
          Login
        </button>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>

      <p>
        Not with us? &nbsp;
        <Link
          href="/signup"
          className="text-primaryBlue italic hover:underline"
        >
          Create an account
        </Link>
      </p>
    </PageContainer>
  )
}
