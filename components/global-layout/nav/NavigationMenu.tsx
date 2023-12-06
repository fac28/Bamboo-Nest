'use client'

import { useState } from 'react'
import {
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from '@nextui-org/react'

export default function NavigationMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuLinks = {
    'Search Items': '/search',
    'Sell Item': '/upload',
    Account: '/account',
    Contact: '/contact',
    FAQs: '/faq',
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="w-min bg-inherit">
      <NavbarContent justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>
      <NavbarMenu className="justify-evenly">
        {Object.entries(menuLinks).map(([item, route], index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full justify-center text-black text-5xl"
              href={route}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
