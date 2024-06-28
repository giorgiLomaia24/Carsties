import { useParamsStore } from '@/hooks/useParamsStore'
import { Button } from 'flowbite-react'
import React from 'react'
import { AiOutlineClockCircle, AiOutlineSortAscending } from 'react-icons/ai';
import { BsFillStopCircleFill, BsStopwatchFill } from 'react-icons/bs';
import { GiFinishLine, GiFlame } from 'react-icons/gi';
import { GrPowerReset } from "react-icons/gr";
import Search from '../nav/Search';



const pageSizeButtons = [4, 8, 12];

const orderButtons = [
    {
        label: "Alphabetical",
        icon: AiOutlineSortAscending,
        value:'make'
    },
    {
        label: "End Date",
        icon: AiOutlineClockCircle,
        value:'endingsoon'
    },
    {
        label: "Recently Added",
        icon: BsFillStopCircleFill,
        value:'new'
    },
]
const filterButtons = [
    {
        label: "Live Auctions",
        icon: GiFlame,
        value:'live'
    },
    {
        label: "Ending < 6 hours",
        icon: GiFinishLine,
        value:'endingSoon'
    },
    {
        label: "Completed",
        icon: BsStopwatchFill,
        value:'finished'
    },
]




export default function Filters() {
    const pageSize = useParamsStore(state => state.pageSize);
    const setParams = useParamsStore(state => state.setParams);
    const orderBy = useParamsStore(state => state.orderBy);
    const filterBy = useParamsStore(state => state.filterBy);
    const reset = useParamsStore(state => state.reset)


  return (
      <div className='flex flex-col md:flex-row md:justify-between items-center mb-4'>
        <div className="flex md:hidden w-[100%] items-center border-2 rounded-full py-2 shadow-sm bg-white mt-2">
        <Search/>
      </div>
        <div className='mt-2'>
          <span className='uppercase text-sm text-gray-500 mr-2 '>Filter By</span>
              <Button.Group>
                  {
                      filterButtons.map(({ label, icon: Icon, value }) => (
                          <Button
                              key={value}
                              onClick={() => setParams({ filterBy: value })}
                              color={`${filterBy === value ? 'green' : 'gray'}`}
                              
                          >
                              <Icon className='mr-3 h-4 w-4' />
                              {label}
                          </Button>
                    ))
                  }
           </Button.Group>
              
          </div>  
          <div className='mt-2'>
          <span className='uppercase text-sm text-gray-500 mr-2 '>Order By</span>
              <Button.Group>
                  {
                      orderButtons.map(({ label, icon: Icon, value }) => (
                          <Button
                              key={value}
                              onClick={() => setParams({ orderBy: value })}
                              color={`${orderBy === value ? 'green' : 'gray'}`}
                              
                          >
                            <Icon/>
                          </Button>
                    ))
                  }
                  <Button onClick={reset} color={'red'}> <GrPowerReset /></Button>
           </Button.Group>
              
          </div>
          <div className='mt-2'>
              <span className='uppercase text-sm text-gray-500 mr-2 '>Page Size</span>
              <Button.Group>
                  {pageSizeButtons.map((value, i) => (
                      <Button
                          key={i}
                          onClick={() => { setParams({ pageSize: value })}}
                          color={`${pageSize === value ? 'green' : 'gray'}`}
                      >
                          {value}
                      </Button>
                  ))}
              </Button.Group>
       </div>
    </div>
  )
}
