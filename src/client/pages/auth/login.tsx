import React from 'react'

import Link from 'next/link'

function Login() {
  return (
    <div>
        <h1>Login Page</h1>
        <Link href="http://localhost:5000/auth/login/google">Click here to login with Google</Link>
    </div>
  )
}

export default Login