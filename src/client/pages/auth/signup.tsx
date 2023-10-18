import React from 'react'

import Link from 'next/link'

function SignUp() {
  return (
    <div>
        <h1>SignUp Page</h1>
        <Link href="http://localhost:5000/auth/login/google">Click here to sign up with Google</Link>
    </div>
  )
}

export default SignUp