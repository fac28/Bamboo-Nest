'use client'
// src/components/Accordion.tsx
import { ReactNode, useState } from 'react'

interface AccordionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="p-4 mb-2">
      <div
        className="flex justify-between items-center cursor-pointer custom-dotted-border-bottom p-4"
        onClick={toggleAccordion}
      >
        <h2 className="text-lg">{title}</h2>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <div className="mt-2 p-4 font-light">{children}</div>}
    </div>
  )
}

export default Accordion
