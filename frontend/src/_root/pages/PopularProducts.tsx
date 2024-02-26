import { Input } from '@/components/ui/input';
import { useGetProductDetails } from '@/lib/react-query/queriesAndMutations'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';


interface Filters {
  category?: string;
  brand?: string;
  color?: string;
  search?: string;
}

interface ProductPageItems {
  id: number;
  title: string;
  category: string;
  color: string; 
  description: string;
  price: string; 
  discount_price?: string | null; 
  img?: string | null;
  numberInStock: number;
  active: number; 
  created_at: string; 
  updated_at: string; 
  brand:string;
}

const PopularProducts = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const page = parseInt(searchParams.get('page') || '1', 10);


  const [filters, setFilters] = useState<Filters>({
    category: '',
    brand: '',
    color: '',
    search: '',
});



const handleFilterChange = (value:string, filterType: keyof Filters) => {
  setFilters(prevFilters => {
   
      if (value === "All") {
       // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const {[filterType]: _, ...rest} = prevFilters; 
          return {...rest};
      }
      return {...prevFilters, [filterType]: value};
  });
};

  const {data:products,isLoading,refetch} = useGetProductDetails(filters,page)


  useEffect(()=>{
    refetch()
  },[filters,refetch,page])


  const handlePrevPage = () => {
 if (page > 1) {
  setSearchParams({ page: (page - 1).toString() });
    }
   
  }

  const handleNextPage = () => {
    setSearchParams({ page: (page + 1).toString() });
    
  }

  useEffect(() => {

    const delayDebounce = setTimeout(() => {
   
      handleFilterChange(searchInput, 'search');
    }, 500);
  
    
    return () => clearTimeout(delayDebounce);
  }, [searchInput]);  

  return (
    <div className='w-full flex'>
         <div className='w-full flex flex-col pt-5 px-10'>
            <h1 className='text-4xl font-bold'>Products</h1>
            <div className='w-full flex justify-between mt-4 mb-2'>
                <div>
                  <Input  
                  placeholder='Search product'
                  onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
                <div>
                  <Select onValueChange={(e) => handleFilterChange(e, 'category')}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                      <SelectItem value="laptops">Laptop</SelectItem>
                      <SelectItem value="desktops">Desktop</SelectItem>
                      <SelectItem value="phones">Phone</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div>
                  <Select onValueChange={(e) => handleFilterChange(e, 'brand')}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Brand" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Apple">Apple</SelectItem>
                      <SelectItem value="MSI">MSI</SelectItem>
                      <SelectItem value="Samsung">Samsung</SelectItem>
                      <SelectItem value="Huawei">Huawei</SelectItem>
                      <SelectItem value="Monster">Monster</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div>
                  <Select onValueChange={(e) => handleFilterChange(e, 'color')}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Color" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="white">White</SelectItem>
                      <SelectItem value="gray">Gray</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            </div>
            <div className='w-full grid grid-cols-1 gap-4 mt-2'>
                {
                isLoading ? (<div className=''>
                  <div className='grid grid-cols-1 gap-4 rounded-md'>
                      <Skeleton className='h-[100px] col-span-1' />
                      <Skeleton className='h-[100px]' />
                      <Skeleton className='h-[100px]' />
                      <Skeleton className='h-[100px]' />
                      <Skeleton className='h-[100px]' />
                  </div>

                </div>) :
                products?.data?.map((item:ProductPageItems)=>(
                  <div key={item.id} className='grid grid-cols-5 border border-black/55 shadow-sm shadow-black/55 rounded-md'>
                      <div className='col-span-1'>
                          <img src={item.category === 'laptops' ? '/public/laptops-category.png' : '/public/phones-category.png'} alt=""  className='w-[100px] h-[100px] object-cover aspect-square '/>
                      </div>
                      <div className='col-span-1 flex items-center'>
                          <span className='text-lg'>{item.title}</span>
                      </div>
                      <div className='col-span-1 flex flex-col items-center justify-center gap-4'>
                          <span className='font-semibold text-lg'>{item.category}</span>
                          <span>{item.brand}</span>
                      </div>
                      <div className='col-span-1 flex items-center justify-center'>
                          <span>{item.color}</span>
                      </div>  
                      <div className='col-span-1 gap-3 flex items-center justify-center'>
                        <div className=''>
                          <span className=' text-base font-semibold'>{item.price}$</span>
                        </div>
                        <Button className={`${item.active === 1 ? 'bg-emerald-500' : 'bg-destructive hover:bg-red-300'} hover:bg-emerald-400`}>
                            In Stock
                        </Button>
                      </div>
                  </div>  
                ))}
            </div>
            <div className="w-full flex items-center justify-center gap-2 mt-5 mb-5">
                    <Button disabled={!products?.prev_page_url} onClick={handlePrevPage}>
                      Prev
                  </Button>
                  <Button  disabled={!products?.next_page_url} onClick={handleNextPage} >
                      Next
                  </Button>
            </div>
        </div>

    </div>
  )
}

export default PopularProducts