'use server'

import { getSession } from 'next-auth/react'
import React from 'react'
import Heading from '../components/Heading';
import {  getTokenWorkaround } from '../actions/AuthActions';
import AuthTest from './AuthTest';

export default async function Session() {
  const session = await getSession();
  const token = await getTokenWorkaround()
  return (
    <div>
      
          <Heading title='Session Dashboard' />
          
          <div className="bg-blue-200 border-2 border-blue-500">
              <h3 className="text-lg">Session Data</h3>
        <pre>{JSON.stringify(session,null,2)}</pre>
      </div>
      
      <AuthTest />
      
      <div className="bg-blue-200 border-2 border-blue-500">
              <h3 className="text-lg">token Data</h3>
        <pre>{JSON.stringify(token,null,2)}</pre>
      </div>
    </div>
  )
}
