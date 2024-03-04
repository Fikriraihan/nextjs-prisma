"use client";

import React, { useEffect, useRef } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button, Switch } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function App() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const imageURI = `https://ui-avatars.com/api/?name=${session?.user.name}&background=random&color=fff`;
  const sessionImage = session?.user.image;
  const { theme, setTheme } = useTheme();

  // useEffect(() => {
  //   if (theme === "dark") {
  //     setChecked(true);
  //   } else {
  //     setChecked(false);
  //   }
  // }, [theme]);

  return (
    <Navbar>
      <NavbarBrand className="flex gap-4">
        <Link href="/" className="font-bold text-inherit">
          ACME
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem></NavbarItem>
        <NavbarItem isActive></NavbarItem>
        {session && status === "authenticated" && (
          <NavbarItem>
            <Link className="hover:text-sky-500 transition-colors" href="/products">
              Products
            </Link>
            <Link className="hover:text-sky-500 transition-colors" href="/posts">
              Posts
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Switch
          color="primary"
          defaultSelected={false}
          onChange={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
        >
          Change Theme
        </Switch>
        {session && status === "authenticated" ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar isBordered as="button" className="transition-transform" color="primary" size="sm" src={sessionImage ? sessionImage : imageURI} />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{session.user.email}</p>
              </DropdownItem>
              <DropdownItem onClick={() => router.push("/profile")} key="settings">
                My Settings
              </DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem>
              <Button color="primary" onClick={() => signIn()} variant="flat">
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/auth/signup" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
