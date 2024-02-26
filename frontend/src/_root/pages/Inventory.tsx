import { Input } from '@/components/ui/input'
import { useAddStock, useGetInventoryLevels } from '@/lib/react-query/queriesAndMutations'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { toast } from "sonner"
interface Inventory {
  id:number;
  numberInStock:number;
  title:string;
}

interface Filters {
  category:string;
  brand:string;
  color:string;
}

const Inventory = () => {


  const [filters, setFilters] = useState<Filters>({
    category: '',
    brand: '',
    color: '',
});
const [search,setSearch] = useState('');
const [stock,setStock] = useState(0);
const [response,setResponse] = useState('');

// @ts-expect-error: Temporarily
  const {data,isLoading} = useGetInventoryLevels(filters);

  const {mutateAsync:addStock,isPending} = useAddStock();


  console.log(data)

  const filteredData = data?.filter((item:Inventory)=>item.title.includes(search));

  const handleAddStock = async (id:number) => {

    const response = await addStock({id,stock})

    setResponse(response)

    setStock(0);
    toast("stock is added")
  }
  
  console.log(response)

  return (
    <div className='w-full flex'>
      <div className='w-full flex flex-col pt-5 px-10'>
        <h1 className='text-4xl font-bold'>Inventory Levels</h1>
        <div className="mt-4 mb-2">
            <Input placeholder='Search for product'
             className="border border-black/55 focus:ring-0 focus:border-transparent"
             onChange={(e)=>setSearch(e.target.value)}
             />
        </div>
        <div className='w-full mb-10 '>
          {
            isLoading ? (
              <div className="flex w-full items-center h-[600px] justify-center">
                 <img src="/public/tube-spinner.svg" className="w-[50px] h-[50px]" alt="" />
               </div>
            ) : (
              <>
               <Table>
                    <TableCaption>Number of products in stock</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Number in stock</TableHead>
                        <TableHead className="">Add More</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData?.map((item:Inventory) => (
                        <TableRow key={item.title}>
                          <TableCell className="font-medium">
                            <img src="/public/laptops-category.png" alt="" />
                          </TableCell>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell>{item.numberInStock}</TableCell>
                          <TableCell>                       
                            <Popover>
                              <PopoverTrigger asChild>
                                  <Plus className='text-emerald-500 cursor-pointer' />
                              </PopoverTrigger>
                                <PopoverContent className="w-80 ">
                                  <div className="flex flex-col ">
                                    <div className="">               
                                      <p className="text-sm text-muted-foreground">
                                        Add stock to the product.
                                      </p>
                                    </div>
                                    <div className="grid gap-2 mt-2 ">
                                      <div className=" items-center justify-center gap-4 ">                                    
                                        <Input
                                          type='number'
                                          className=" h-8"
                                          onChange={(e)=>setStock(Number(e.target.value) || 0)}
                                          value={stock}
                                        />
                                      </div>                                                                   
                                    </div>
                                    <div className='mt-4 flex justify-end w-full'>
                                      <Button disabled={isPending} className='bg-emerald-500 hover:bg-emerald-400' onClick={()=>handleAddStock(item.id)}>
                                        Add
                                      </Button>
                                    </div>
                                  </div>
                                </PopoverContent>
                            </Popover>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                 </Table>
              </>
            )
          }
       
        </div>
      </div>
    </div>
  )
}

export default Inventory