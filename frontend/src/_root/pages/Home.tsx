


import { Skeleton } from "@/components/ui/skeleton"
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
const Home = () => {

 
  
  const {data:currentUser,isLoading: isUserLoading} = useGetCurrentUser();

  

  console.log(currentUser)


  if(isUserLoading) 
  {
    return (
      <div className=''>
       <Skeleton className="w-[100px] h-[20px] rounded-full bg-gray-400 " />
      </div>
    )
  }


  return (
    <div className=''>Home

    
    </div>

  )
}

export default Home