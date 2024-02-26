import { useGetRevenuePage } from '@/lib/react-query/queriesAndMutations'
import { Wallet } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


interface RevenuePageItemProps {
  month:number;
  year:number;
  total:string;
}

const RevenuePage = () => {

  const {data:revenuePageData} = useGetRevenuePage()

 

  const formatCurrency = (value:number):string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      currencyDisplay: 'symbol', 
    }).format(value).slice(0, -3); 
  }
  const convertedData = revenuePageData?.revenue?.map((item:RevenuePageItemProps) => ({
    ...item,
    month: monthNames[item.month - 1] 
  }));

  return (
    <div className='w-full flex '>
     <div className='w-full flex flex-col pt-5 px-10'>
            <h1 className='text-4xl font-bold'>Revenue</h1>
            <div className='w-full flex flex-col mt-10'>
                <div className='flex gap-4 items-center'>
                    <Wallet className='w-8 h-8' />
                 <p className='text-2xl font-semibold'>Total Earnings:</p>
                  <span className='text-2xl font-semibold text-emerald-500 border rounded-md border-emerald-300 border-l-4 border-b-4 p-1'>
                     {revenuePageData && formatCurrency(revenuePageData.total)}
                  </span>
                </div>
                <div className='mt-4'> 
                <Table>
                    <TableCaption>A list of your recent revenues.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="">Year</TableHead>
                        <TableHead>Month</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {convertedData?.map((item:RevenuePageItemProps,index:number)=>(
                        <TableRow key={index}>
                        <TableCell className="font-medium">{item.year}</TableCell>
                        <TableCell>{item.month}</TableCell>
                        <TableCell className='text-right'>{formatCurrency(Number(item.total))}</TableCell>           
                      </TableRow>
                      ))     
                      } 
                    </TableBody>            
                  </Table>
                </div>
            </div>
      </div>   
    </div>
  )
}

export default RevenuePage