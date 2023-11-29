// pages/index.tsx
import PageContainer from '@/components/PageContainer'
import Accordion from '@/components/Accordion'

const Home: React.FC = () => {
  return (
    <PageContainer justify="justify-start">
      {/* <div className="p-4"> */}
      <Accordion title="Section 1">
        <p>Content for section 1 goes here.</p>
      </Accordion>
      <Accordion title="Section 2">
        <p>Content for section 2 goes here.</p>
      </Accordion>
      {/* </div> */}
    </PageContainer>
  )
}

export default Home
