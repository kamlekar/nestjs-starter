import { useEffect, useState } from "react"

import { cookies } from 'next/headers'

function useSession() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(()=> {
    const cookieStore = cookies()
    const session = cookieStore.get('connect.sid')
    if(session) setIsAuthenticated(true)
    else setIsAuthenticated(false)
  }, [])

    return {isAuthenticated}
}

export default useSession