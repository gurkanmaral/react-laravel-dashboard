import { useGetOrderDetails } from '@/lib/react-query/queriesAndMutations'

import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from '@/components/ui/input'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from 'date-fns'
import { Separator } from '@/components/ui/separator'
 
 

const TotalOrders = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const [searchTerm,setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const [filters,setFilters] = useState({
    search: '',
    status: '',
  });



const {data:orderDetails,isLoading,refetch:orderDetailsRefecth} = useGetOrderDetails(filters,page)

console.log(orderDetails)

useEffect(()=>{
  orderDetailsRefecth

},[page,orderDetailsRefecth])


const handleFilterChange = (value, filterType) => {
  setFilters(prevFilters => {
   
      if (value === "All") {
          const {[filterType]: _, ...rest} = prevFilters; 
          return {...rest};
      }
      return {...prevFilters, [filterType]: value};
  });
};

const handlePrevButton = () => {
  if (page > 1) {
      setSearchParams({ page: page - 1 });
  }
};
const handleNextButton = () => {
setSearchParams({ page: page + 1 });
};

useEffect(() => {

  const delayDebounce = setTimeout(() => {
 
    handleFilterChange(searchInput, 'search');
  }, 500);

  
  return () => clearTimeout(delayDebounce);
}, [searchInput]);  


console.log(filters)
  return (
    <div className='w-full flex'>
      <div className='w-full flex flex-col pt-5 px-10'>
        <h1 className='text-4xl font-bold'>Orders</h1>
        <div className="w-full mt-2 flex justify-between">
            <div>
              <Input 
              placeholder='Search emails'
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
              />
            </div>
             <div>
                <Select onValueChange={(e) => handleFilterChange(e, 'status')}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                </Select>
                </div>
        </div>
        <div className='w-full'>
          {
            isLoading ? (<div>
                   <div className="flex w-full items-center h-[600px] justify-center">
                 <img src="/public/tube-spinner.svg" className="w-[50px] h-[50px]" alt="" />
               </div>
            </div> 
            ) : (
              <>
               <Table className=' mt-2  '>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Emails</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {
            orderDetails?.data.map((item)=> (
              <TableRow key={item.id}>
              <TableCell className="font-medium">{item.status}</TableCell>
              <TableCell>{item.user.email}</TableCell>
              <TableCell className="text-right text-base font-semibold">{item.totalPrice}$</TableCell>
              <TableCell className="flex items-center justify-end">                         
                      <Dialog>
                        <DialogTrigger> 
                          <MoreHorizontal className="h-4 w-4 cursor-pointer" />          
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Orde Details</DialogTitle>                        
                          </DialogHeader>
                          <div className=' w-full flex flex-col max-h-[500px] overflow-y-auto p-2 gap-2'>
                                   <div className=' p-2 flex gap-2 items-center'>
                                    <h1 className='text-xl font-bold'>User:</h1>
                                      <span className='text-base'>
                                        {item.user.email}
                                      </span>
                                   </div>
                                   <div className='p-2 mt-2 rounded-md border border-black/55 shadow-sm shadow-black/15 mb-4'>
                                      <h1 className='text-xl font-bold'>
                                        User's note:
                                      </h1>
                                      <p>
                                        {item.notes}
                                      </p>
                                   </div>
                                   <div className='p-2 flex items-center gap-2 '>
                                     <h1 className='text-xl font-bold'>
                                         Payment Method:
                                     </h1> 
                                  <span>
                                    {item.payment_method}
                                  </span>
                                   </div>
                                   <div className='flex items-center gap-2 p-2'>
                                    <h1 className='text-xl  font-bold'>
                                       Order date:
                                     </h1> 
                                     <span>
                                       {format(item.created_at,'yyyy-MM-dd')}
                                     </span>
                                   </div>
                                   <div className='flex items-center p-2 gap-2'>
                                     <h1 className='text-xl  font-bold'>
                                        Status:
                                      </h1> 
                                      <div className='flex flex-col gap-2'>
                                          <span>{item.status}</span>                                  
                                              {item.status === "cancelled" && 
                                              <span className='text-destructive'>
                                               {item.cancellation_reason}
                                          </span>}             
                                      </div>       
                                   </div>
                                   <div className='flex items-center p-2 gap-2'>
                                   <h1 className='text-xl  font-bold'>
                                        Shipping Address:
                                    </h1>
                                    <span>
                                      {item.shipping_address}
                                    </span>
                                   </div>
                                   <div className='flex items-center gap-2 p-2'>
                                   <h1 className='text-xl  font-bold'>
                                    Tracking Number:
                                    </h1>
                                       <span className='border border-black p-1 rounded-md'>
                                           {item.tracking_number}
                                       </span>
                                   </div>
                                   <div>
                                    {item.order_items.map((item)=>(
                                      <div key={item.id} className='flex flex-col mt-2'>
                                        <Separator />
                                          <div>                               
                                                <div className='flex p-2 gap-2' >
                                                    <img src="/public/desktop.png" className='h-40 w-40' alt="" />
                                                    <div className='flex flex-col gap-2 w-full'>
                                                         <div className='flex gap-2 justify-between'>
                                                          <span className='font-semibold'>{item.product.title}</span>
                                                          <span>
                                                            {item.product.brand}
                                                          </span>
                                                         </div>
                                                         <div className='flex gap-2 justify-between'>
                                                           <span className='font-bold'>{item.product.price}$</span>
                                                           <span>
                                                            {item.product.color}  
                                                           </span>
                                                         </div>
                                                    </div>
                                              </div>                                          
                                          </div>
                                      </div>
                                    ))}
                                   </div>
                                  </div>
                        </DialogContent>
                      </Dialog>                                               
             </TableCell>
            </TableRow>
            ))
             }
            </TableBody>
          </Table>
              </>
            )
          }
       
        </div>
        <div className="w-full flex items-center justify-center gap-2 mt-2 mb-4">
            <Button disabled={page <= 1 ||  isLoading} onClick={handlePrevButton} className=" px-5">
               Prev
          </Button>
          <Button disabled={!orderDetails?.next_page_url || isLoading} onClick={handleNextButton} className=" px-5">
               Next
          </Button>
            </div>
      </div>
    </div>
  )
}

export default TotalOrders