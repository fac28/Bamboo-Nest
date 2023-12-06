import WideFoundationButton from '@/components/buttons/WideFoundationButton'
import PageContainer from '@/components/global-layout/PageContainer'
import FormFieldAndLabel from '@/components/forms/FormFieldAndLabel'

export default function StyleGuide() {
  return (
    <PageContainer className="max-w-4xl child:w-full">
      <h1 className="text-center">Style Guide</h1>
      <div className="child:py-4 ">
        <section className="custom-dotted-border-bottom pb-4">
          <h2 className="text-xl text-center font-medium pb-4">Colours</h2>
          <div className="flex flex-wrap gap-4 child:border child:border-black">
            <div className="w-[100px] h-[100px] bg-foundation flex items-center justify-center">
              <p>Foundation</p>
            </div>
            <div className="w-[100px] h-[100px] bg-background flex items-center justify-center">
              <p>Background</p>
            </div>
            <div className="w-[100px] h-[100px] bg-black flex text-white items-center justify-center">
              <p>Black</p>
            </div>
            <div className="w-[100px] h-[100px] bg-white flex items-center justify-center">
              <p>White</p>
            </div>
          </div>
        </section>
        <section className="custom-dotted-border-bottom pb-4">
          <h2 className="text-xl text-center font-medium pb-4">Fonts</h2>
          <div className="p-4">
            <h1>H1. This is a header.</h1>
            <h2>H2. This is a header. </h2>
            <h3>H3. This is a medium header.</h3>
            <p>A general paragraph will look like this.</p>
          </div>
          <p>
            The site uses the google font{' '}
            <span className="font-medium">DM Sans</span> which is applied to all
            text elements. The font is imported via next/font which imports all
            the font varieties by default.
          </p>
        </section>
        <section className="custom-dotted-border-bottom pb-4">
          <h2 className="text-xl text-center font-medium pb-4">Components</h2>
          <div className="max-w-sm child:my-2 ">
            <WideFoundationButton
              buttonTitle="Button Title"
              pageUrl=""
              className="w-full"
            />
            <FormFieldAndLabel
              htmlForInput="email"
              labelName="Email"
              inputType="email"
              inputName="email"
              inputPlaceholder="you@example.com"
              required
            />
          </div>
          <p className="pt-4">
            There are also ItemCard and CategoryCard components which are to be
            used when listing individual items, and for when listing categories.
          </p>
        </section>
        <section className="custom-dotted-border-bottom pb-4">
          {' '}
          <h2 className="text-xl text-center font-medium pb-4">
            General Rules
          </h2>
          <ul className="child:list-disc">
            <li>
              All pages should be wrapped in the PageContainer component. This
              applies default styling to all pages for uniformity. If you need
              to apply custom styling to the PageContainer on a page, you can
              use className as an optional prop.
            </li>
            <li>
              Use the child: selector in combo with tailwind to apply styles to
              child elements. There is a function in the tailwind.config which
              will apply styling to child elements.
            </li>
          </ul>
        </section>
      </div>
    </PageContainer>
  )
}
