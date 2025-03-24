import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import React from 'react'
import { ModeToggle } from './ModeToggle';

function Navbar() {
  return (
    <header
      style={{ display: "flex",alignItems:"center", justifyContent: "space-between", padding: 20 }}
        className='container max-w-6xl mx-auto'
    >
      <ModeToggle />
      <h1>Todo Next Js</h1>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  );
}

export default Navbar