import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function ReviewSeller({ seller_id }: { seller_id: string }) {
  'use server'
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: sellerData } = await supabase
    .from('users')
    .select('first_name')
    .eq('id', seller_id)
  let seller_name = ''
  seller_name = sellerData && sellerData[0].first_name

  const submit = async (formData: FormData) => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: userData } = await supabase.auth.getUser()

    const review_score = Math.round(
      Number(formData.get('review-score')) / 25 + 1,
    )
    const review_comment = formData.get('review-comment') as string
    const seller_id = formData.get('seller-id') as string

    const { error } = await supabase.from('reviews').insert({
      seller_id: seller_id,
      user_id: userData && userData.user?.id,
      review_score: review_score,
      comment: review_comment,
    })

    if (error) {
      console.error(error)
    }

    return redirect('/account/purchases')
  }

  return (
    <div>
      <h1>Review {seller_name} </h1>
      <form className="grid grid-cols-1 gap-2">
        <input
          id="seller-id"
          name="seller-id"
          value={seller_id}
          className="hidden"
        />
        <label htmlFor="review">Review</label>
        <input
          type="range"
          id="review-score"
          name="review-score"
          list="values"
        />
        <datalist style={{ display: 'flex', justifyContent: 'space-between' }}>
          <option value="1" label="1" />
          <option value="2" label="2" />
          <option value="3" label="3" />
          <option value="4" label="4" />
          <option value="5" label="5" />
        </datalist>
        <label htmlFor="review-comment">Comment</label>
        <textarea
          id="review-comment"
          name="review-comment"
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          placeholder="leave a comment"
        />
        <button type="submit" formAction={submit}>
          Submit
        </button>
      </form>
    </div>
  )
}
