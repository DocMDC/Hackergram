// "use client"
// import { useSession } from 'next-auth/react'
// import { redirect } from 'next/navigation'

export default function FriendsFeed() {
    // const {data: session} = useSession({
    //     required: true,
    //     onUnauthenticated() {
    //         redirect('/')
    //     }
    // })
    
    // if (!session?.user) return

    // console.log('This is the FriendsFeed session info:')
    // console.log(session)

  return (
    <div>
        <h1>This is the FriendsFeed page</h1>
    </div>
  )
}
