import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDeleteUser, useGetAllUsersInPage } from "@/lib/react-query/queriesAndMutations"
import { format } from "date-fns";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner"

interface Users {
  created_at:string;
  email:string;
  email_verified_at:string;
  img?:string | null;
  id:number;
  name:string;
  updated_At:string;
  username:string;
}

const Users = () => {

  const [deleteResponse,setDeleteResponse] = useState('');
  const [searchTerm,setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);



  console.log(page)

  const {mutateAsync:deleteUser} = useDeleteUser();

  const { data, isLoading: usersLoading, refetch: userRefetch } = useGetAllUsersInPage(page, searchTerm);

  console.log(data)

  const handlePrevButton = () => {
    if (page > 1) {
      setSearchParams({ page: (page - 1).toString() });
    }
};
const handleNextButton = () => {
  setSearchParams({ page: (page + 1).toString() });
};

useEffect(()=>{
  userRefetch()
},[page,userRefetch,debouncedSearchTerm])

useEffect(()=>{

  const timerId = setTimeout(()=>{
    setDebouncedSearchTerm(searchTerm);
  },2000)

  return () => {
    clearTimeout(timerId);
  };
},[searchTerm])

const handleDeleteUser = async(id:number) => {

  const response = await deleteUser(id)

  setDeleteResponse(response);
  toast(response)
}


console.log(searchTerm)

console.log(deleteResponse,'deleteResponse')

  return (
    <div className='w-full flex '>
        <div className='w-full flex flex-col pt-5 px-10'>
            <h1 className='text-4xl font-bold'>Users</h1>
            <div className="mt-4 mb-2">
              <Input placeholder="Search Users" 
              onChange={(e)=>setSearchTerm(e.target.value)}
              value={searchTerm}
              className="border border-black/55 focus:ring-0 focus:border-transparent" />
            </div>
            <div>
              {usersLoading ? (
                  <div className="flex w-full items-center h-[600px] justify-center">
                        <img src="/public/tube-spinner.svg" className="w-[50px] h-[50px]" alt="" />
                </div>
              ) : (
                <>
                  <Table>
                <TableCaption>A list of users.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead className="">Email</TableHead>
                    <TableHead className="">Creation Date</TableHead>
                    <TableHead className="max-w-[100px]">Edit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data?.map((item:Users)=> (
                    <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell className="">{item.email}</TableCell>
                    <TableCell className="">{format(item.created_at, 'yyyy-MM-dd')}</TableCell>
                    <TableCell className="flex gap-2">
                        <X className="text-destructive cursor-pointer" onClick={()=> handleDeleteUser(item.id)}  />
                    </TableCell>
                  </TableRow>
                  ))}
                  
                </TableBody>
            </Table>
                </>
              )}
          
            </div>
            <div className="w-full flex items-center justify-center gap-2 mt-2 mb-4">
            <Button disabled={page <= 1 ||  usersLoading} onClick={handlePrevButton} className=" px-5">
               Prev
          </Button>
          <Button disabled={!data?.next_page_url || usersLoading} onClick={handleNextButton} className=" px-5">
               Next
          </Button>
            </div>
            
        </div>

    </div>
  )
}

export default Users