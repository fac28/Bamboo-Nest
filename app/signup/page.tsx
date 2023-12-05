/* eslint-disable @typescript-eslint/no-explicit-any */

import { redirect } from 'next/navigation'
import UpdateForm from '@/components/forms/UpdateProfile'
import PageContainer from '@/components/global-layout/PageContainer'
import FormFieldAndLabel from '@/components/forms/FormFieldAndLabel'
import getUser from '@/utils/getUser'
import newClient from '@/utils/createNewClient'
import { Metadata } from 'next'
import { z } from 'zod'

export const metadata: Metadata = {
  title: 'Signup - Bamboo Nest',
}

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signUp = async (formData: FormData) => {
    'use server'
    const UserSchema = z.object({
      email: z.string().email(),
      password: z.string(),
      firstName: z.string(),
      lastName: z.string()
    })
    const emailUnverified = formData.get('email') as string
    const passwordUnverified = formData.get('password') as string
    const firstNameUnverified = formData.get('First Name') as string
    const lastNameUnverified = formData.get('Last Name') as string
    const supabase = newClient() as unknown as any

    const {email,password,firstName,lastName} = UserSchema.parse({
      email: emailUnverified,
      password: passwordUnverified,
      firstName: firstNameUnverified,
      lastName: lastNameUnverified
    })

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      console.error(error)
      return redirect(`/login?message=${error.message}`)
    }

    const userID = data?.user?.id

    if (userID) {
      return redirect(`/login?message=Error creating user`)
    }

    await supabase
      .from('users')
      .upsert({
        id: userID,
        first_name: firstName,
        last_name: lastName,
        created_at: new Date(),
      })
      .select()

    return redirect('/account')
  }

  const { user } = await getUser()

  return user ? (
    <PageContainer>
      <div>
        <UpdateForm />
      </div>
    </PageContainer>
  ) : (
    <PageContainer>
      <h1 className="mb-10 w-[80%] text-center mx-auto">Create an account </h1>
      <form className="animate-in flex-1 flex flex-col max-w-xl w-full justify-center gap-2 text-foreground">
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
          aria-label="create account"
          formAction={signUp}
          className="px-4 py-2 mb-2 bg-primaryBlue text-white rounded-full"
        >
          Register
        </button>
        {searchParams?.message && (
          <p
            role="alert"
            className="mt-4 p-4 bg-foreground/10 text-foreground text-center"
          >
            {searchParams.message}
          </p>
        )}
      </form>
    </PageContainer>
  )
}
