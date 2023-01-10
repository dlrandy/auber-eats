import { useRouter } from 'next/router'
const withAuth = (WrappedComponent:React.ComponentType) => {
  return (props:React.ComponentProps<any>) => {
    if (typeof window !== 'undefined') {
      const Router = useRouter()

      const accessToken = localStorage.getItem('accessToken')

      if (!accessToken) {
        Router.replace('/')
        return null
      }
      return <WrappedComponent {...props} />
    }

    // If we are on server, return null
    return null
  }
}

export default withAuth
