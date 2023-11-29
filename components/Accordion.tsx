'use client'
// src/components/Accordion.tsx
import { ReactNode, useState } from 'react'

interface AccordionProps {
  title: string
  children: ReactNode
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="p-8 mb-2">
      <div
        className="flex justify-between items-center cursor-pointer border-b p-4 "
        onClick={toggleAccordion}
      >
        <h2 className="text-lg font-medium ">{title}</h2>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <div className="mt-2 p-4">{children}</div>}
    </div>
  )
}

export default Accordion
