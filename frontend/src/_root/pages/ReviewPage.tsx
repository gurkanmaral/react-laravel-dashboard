import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetReviewDetails } from '@/lib/react-query/queriesAndMutations'
import { format } from 'date-fns'
import { useSearchParams } from 'react-router-dom'

interface ReviewPageProps {
  created_at:string;
  id:number;
  product_id:number;
  rating:number;
  review_text:string;
  updated_at:string;
  user_id:number;
  product: ReviewPageProductProps;
  user:ReviewPageUserProps;
}
type ReviewPageUserProps = {
  id:number;
  email:string;
  username:string;
}

type ReviewPageProductProps = {
  id:number;
  title:string;
}

const ReviewPage = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1', 10);

  const {data:reviewData,isLoading} = useGetReviewDetails(page)

  const handlePrevButton = () => {
    if (page > 1) {
      setSearchParams({ page: (page - 1).toString() });
    }
};
const handleNextButton = () => {
  setSearchParams({ page: (page + 1).toString() });
};


  return (
    <div className='w-full flex '>
     <div className='w-full flex flex-col pt-5 px-10'>
            <h1 className='text-4xl font-bold'>Reviews</h1>
            <div className='w-full grid grid-cols-1 mt-10 gap-10'>
          {
          isLoading ? (
            <div className='w-full max-w-5xl items-center justify-center flex flex-col gap-10 '>
              <div className='grid grid-cols-10 gap-2 w-full '>
                <Skeleton className='rounded-full w-[75px] h-[75px] bg-gray-600 col-span-1 ' />
                <div className='grid-cols-9 w-[300px] md:w-[700px]'>
                    <div className='flex flex-col w-full'>
                        <div className='flex justify-between w-full'>
                            <div className='flex flex-col gap-2'>
                                <Skeleton className='w-[100px] h-[20px] bg-gray-600' />
                               <Skeleton className='w-[150px] h-[20px] bg-gray-600' />
                            </div>
                            <div>
                              <Skeleton className='w-[50px] h-[20px] rounded-md bg-gray-600' />
                            </div>
                        </div>
                        <div className='flex mt-2 flex-col overflow-y-auto min-w-[100px] max-h-[100px] gap-2 '>
                              <Skeleton className='w-[50px] h-[20px] bg-gray-600' />
                              <Skeleton className='w-full h-[20px] bg-gray-600' />
                        </div>
                    </div>
                </div>
              </div>
              <div className='grid grid-cols-10 gap-2 w-full'>
                <Skeleton className='rounded-full w-[75px] h-[75px] bg-gray-600 col-span-1 ' />
                <div className='grid-cols-9 w-[300px] md:w-[700px]'>
                    <div className='flex flex-col w-full'>
                        <div className='flex justify-between w-full'>
                            <div className='flex flex-col gap-2'>
                                <Skeleton className='w-[100px] h-[20px] bg-gray-600' />
                               <Skeleton className='w-[150px] h-[20px] bg-gray-600' />
                            </div>
                            <div>
                              <Skeleton className='w-[50px] h-[20px] rounded-md bg-gray-600' />
                            </div>
                        </div>
                        <div className='flex mt-2 flex-col overflow-y-auto min-w-[100px] max-h-[100px] gap-2 '>
                              <Skeleton className='w-[50px] h-[20px] bg-gray-600' />
                              <Skeleton className='w-full h-[20px] bg-gray-600' />
                        </div>
                    </div>
                </div>
              </div>
              <div className='grid grid-cols-10 gap-2 w-full'>
                <Skeleton className='rounded-full w-[75px] h-[75px] bg-gray-600 col-span-1 ' />
                <div className='grid-cols-9 w-[300px] md:w-[700px]'>
                    <div className='flex flex-col w-full'>
                        <div className='flex justify-between w-full'>
                            <div className='flex flex-col gap-2'>
                                <Skeleton className='w-[100px] h-[20px] bg-gray-600' />
                               <Skeleton className='w-[150px] h-[20px] bg-gray-600' />
                            </div>
                            <div>
                              <Skeleton className='w-[50px] h-[20px] rounded-md bg-gray-600' />
                            </div>
                        </div>
                        <div className='flex mt-2 flex-col overflow-y-auto min-w-[100px] max-h-[100px] gap-2 '>
                              <Skeleton className='w-[50px] h-[20px] bg-gray-600' />
                              <Skeleton className='w-full h-[20px] bg-gray-600' />
                        </div>
                    </div>
                </div>
              </div>
          </div>) 
          :
          reviewData?.data.map((item:ReviewPageProps)=>(
           <>
             <div key={item.id} className='grid grid-cols-10 gap-2'>
              <div className=' flex w-full col-span-1  '>
                 <img src="/public/userr.png" alt=""  className='p-2 w-[75px] h-[75px] object-cover aspect-square ' />
              </div>
              <div className='flex flex-col w-full  col-span-9'>
                    <div className='flex flex-col'>
                       <div className='flex justify-between'>
                        <div className='flex flex-col'>
                          <span className='text-lg font-semibold'>
                                {item.user.username}
                            </span>
                            <span className='text-base '>
                                {item.user.email}
                            </span>
                        </div>
                        <div className='flex gap-2'>
                          <span>Rating:</span>
                          <span className={item.rating <= 2 ? 'text-destructive' : item.rating <= 3 ? 'text-yellow-400' : 'text-emerald-500 ' }>{item.rating}</span>
                        </div>
                       </div>
                    </div>
                    <div className='flex mt-2 flex-col overflow-y-auto min-w-[100px] max-h-[100px] '>
                        <h1 className='text-base'>Review on <span className='text-destructive font-semibold'>{item.product.title}</span>:</h1>
                        <p className='text-gray-600'>
                        {item.review_text}
                        </p>
                    </div>
                    <div className='mt-5'>
                      <p>Review Date: {format(item.created_at, 'yyyy-MM-dd')}</p>
                    </div>
              </div>
           </div>
             <Separator className='' />
           </>
          ))}
            </div>  
            <div className="w-full flex items-center justify-center gap-2 mt-2 mb-4">
                  <Button disabled={page <= 1 ||  isLoading} onClick={handlePrevButton} className=" px-5">
                    Prev
                </Button>
                <Button disabled={!reviewData?.next_page_url || isLoading} onClick={handleNextButton} className=" px-5">
                    Next
                </Button>
            </div>
      </div>
 </div>
  )
}

export default ReviewPage