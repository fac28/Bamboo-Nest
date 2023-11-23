export default function Page({ params }: { params: { category: string } }) {
  return <div>Category: {decodeURIComponent(params.category)}</div>
}
