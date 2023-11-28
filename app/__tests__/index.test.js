import { render, screen } from '@testing-library/react'
import Index from '../page'
import '@testing-library/jest-dom'

/*
 * @param {function} Component
 * @param {*} props
 * @returns {Promise<()=>JSX.Element>}
 */

async function resolvedComponent(Component, props) {
    const ComponentResolved = await Component(props)
    return () => ComponentResolved
}

describe('Index', () => {
    it('renders a heading', async () => {
        const IndexResolved = await resolvedComponent(Index)
        render(<IndexResolved />)

        const heading = screen.getByRole('heading', {
            name: /Bamboo Nest/i,
        })

        expect(heading).toBeInTheDocument()
    })
})