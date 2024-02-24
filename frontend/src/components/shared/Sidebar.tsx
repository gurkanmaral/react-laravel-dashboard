
import { Button } from '../ui/button'
import { useSignOutUser } from '@/lib/react-query/queriesAndMutations';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Link } from 'react-router-dom';
import Wrapper from "./SidebarWrapper";
import Toggle from './toggle';
import { useSidebar } from '@/lib/use-sidebar';
import { HandCoins, Laptop2, Layers, Layers3, LogOut, LogOutIcon, LucideLogOut, ShoppingCart, Star, User } from 'lucide-react';
import SidebarLinks from './SidebarLinks';
import { cn } from '@/lib/utils';
const Sidebar = () => {

    const {mutate:signOut,isPending:isSignOutLoading} = useSignOutUser();

    const {collapsed} = useSidebar((state)=>state);



    const handleSignOut = (e) => {

        e.preventDefault()
    
        signOut()
    
      }
     
      const sidebarLinks = [
        {
          value:"1",
          link: "/users",
          trigger:"Users",
          icon:User,
          text: "All Users"
        },
        {
          value:"2",
          link: "/inventory",
          trigger:"Inventory",
          icon:Layers3,
          text: "Inventory Levels"
        },
        {
          value:"3",
          link: "/total-orders",
          trigger:"Orders",
          icon:ShoppingCart,
          text: "Total Orders"
        },
        {
          value:"4",
          link: "/products",
          trigger:"Products",
          icon:Laptop2,
          text: "Products"
        },
        {
          value:"5",
          link: "/revenue",
          trigger:"Revenue",
          icon:HandCoins,
          text: "Total Revenue"
        },
        {
          value:"6",
          link: "/reviews",
          trigger:"Reviews",
          icon:Star,
          text: "Reviews"
        }
      ]

  return (
    <Wrapper>
      <Toggle />
        <div className='w-full flex  py-2 px-4  justify-start flex-col pt-4'>
        <Accordion type="single" collapsible className={cn("flex w-full flex-col", collapsed ? 'gap-10 items-center' : '')}>         
          {sidebarLinks.map((item)=>(
             <SidebarLinks value={item.value} trigger={item.trigger} key={item.value} Icon={item.icon} text={item.text} link={item.link}  />
            ))
          }
  
        </Accordion>
        <Button onClick={handleSignOut} disabled={isSignOutLoading} variant={'destructive'} className='mt-6'>
                {collapsed ? (
                    <div>
                        <LucideLogOut className='w-4 h-4' />
                    </div>
                ): 
                (
                  <span>
                      Logout
                  </span>
                )}
         </Button>
        </div>

    </Wrapper>
  )
}

export default Sidebar