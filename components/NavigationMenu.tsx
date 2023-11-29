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

  const menuLinks = {
    'Search Items': '/search',
    'Sell Item': '/upload',
    Account: '/account',
    Contact: '/contact',
    FAQs: '/faq',
  }

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
        />
      </NavbarContent>
      <NavbarMenu className="justify-evenly">
        {Object.entries(menuLinks).map(([item, route], index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              // color={
              //   index === 2
              //     ? 'primary'
              //     : index === Object.keys(menuLinks).length - 1
              //       ? 'danger'
              //       : 'foreground'
              // }
              className="w-full justify-center"
              href={route}
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
