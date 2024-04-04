import EmptyFillter from '@/app/components/EmptyFillter'
import React from 'react'

export default function Page({searchParams}: {searchParams :{callbackUrl :string}}) {
  return (
      <EmptyFillter
          title='You must be logged in to acces this route'
          subtitle='Please click below to sign in'
          showLogin
         callbackUrl={searchParams.callbackUrl}      
      />
  )
}

