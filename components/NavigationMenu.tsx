'use client'

import React from 'react'
import {
  Navbar,
  // NavbarBrand,
  NavbarContent,
  // NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  // Button,
} from '@nextui-org/react'

export default function NavigationMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const menuItems = ['Search Items', 'Sell Item', 'Account', 'Contact', 'FAQs']

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="w-min">
      {/* <NavbarContent>
        <NavbarBrand>
          <p className="font-bold text-inherit">Bamboo Nest</p>
        </NavbarBrand>
      </NavbarContent> */}

      <NavbarContent justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          // className="sm:hidden"
        />
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? 'primary'
                  : index === menuItems.length - 1
                    ? 'danger'
                    : 'foreground'
              }
              className="w-full justify-center"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
