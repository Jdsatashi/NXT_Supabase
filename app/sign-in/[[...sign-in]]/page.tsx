import { SignIn } from '@clerk/nextjs'
import React from 'react'

function Signin() {
    return (
        <main className="flex items-center justify-center h-screen bg-gray-100">
            <SignIn />
        </main>
    )
}

export default Signin