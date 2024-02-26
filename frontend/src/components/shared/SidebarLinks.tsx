import React from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Link } from 'react-router-dom'
import { useSidebar } from '@/lib/use-sidebar'

type SideBar = {
    link:string;
    value: string;
    text:string;
    trigger:string;
    Icon: React.ElementType; 
}


const SidebarLinks = ({link, value,text,Icon,trigger}:SideBar) => {

    const {collapsed} = useSidebar((state)=>state);

  return (
        <>
        {
            collapsed ? 
            (
                   <Link to={link}>
                      <Icon />
                   </Link>
            )
            : 
            <AccordionItem value={value} className='w-full items-center flex flex-col '  >
                <AccordionTrigger>{trigger}</AccordionTrigger>
                <AccordionContent className='flex items-center '>
                    <Link to={link} className='hover:text-emerald-500'>
                        {text}
                    </Link>
                </AccordionContent>
             </AccordionItem>
        }
        </>
     

  )
}

export default SidebarLinks