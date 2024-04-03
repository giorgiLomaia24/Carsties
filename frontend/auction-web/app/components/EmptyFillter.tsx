import { useParamsStore } from '@/hooks/useParamsStore'
import React from 'react'
import Heading from './Heading'
import { Button } from 'flowbite-react'

type Props = {
  
    showReset:boolean
}

export default function EmptyFillter({
   
    showReset
    
}: Props) {
    
    const reset = useParamsStore(state => state.reset)
  return (
      <div className='h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg'>
          <Heading title={'No matches for this filter'} subTitle={'Try changing or reset the filters'} center />
          <div className="mt-4">
              {showReset && (<Button outline onClick={reset}>Remove Filters</Button>)}
          </div>
      
    </div>
  )
}
