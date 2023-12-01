import { redirect } from 'next/navigation'
import newClient from '@/utils/createNewClient'
import Star from '@/components/Star'

export async function ReviewSeller({ seller_id }: { seller_id: string }) {
  'use server'
  const supabase = newClient()

  const { data: sellerData } = await supabase
    .from('users')
    .select('first_name')
    .eq('id', seller_id)

  if(sellerData && !sellerData[0]){
    return <div>Seller does not exist</div>
  }

  let seller_name = ''
  seller_name = sellerData && sellerData[0].first_name

  const submit = async (formData: FormData) => {
    'use server'

    const supabase = newClient()

    const { data: userData } = await supabase.auth.getUser()

    const review_score = Number(formData.get('review-score'))

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

    return redirect(`/seller/${seller_id}/history`)
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
        <Star />
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
