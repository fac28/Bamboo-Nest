import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primaryBlue text-white py-8 mt-16">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* Brand Name on the left side */}
        <div className="text-2xl font-bold">Bamboo Nest</div>

        {/* Three columns on the right side */}
        <div className="flex space-x-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Column 1</h3>
            <ul className="list-none">
              <li>
                <Link href="/home">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              {/* Add more links as needed */}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Column 2</h3>
            <ul className="list-none">
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              {/* Add more links as needed */}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Column 3</h3>
            <ul className="list-none">
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              {/* Add more links as needed */}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
