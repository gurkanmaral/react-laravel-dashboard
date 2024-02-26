import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from "sonner"

const SignUpValidation = z.object({
  name: z.string().min(2,{message:"At least 3 characters needed"}).max(50),
  username: z.string().min(3,{message:"At least 3 characters needed"}).max(50),
  email:z.string().email(),
  password: z.string().min(5,{message: 'Password must be at least 8 characters'}).max(50),
})

interface SignUpProps {
  name:string;
  username:string;
  email:string;
  password:string;
}
const APP_URL = process.env.LARAVEL_URL;

const SignUpForm = () => {

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignUpValidation>>({

    resolver: zodResolver(SignUpValidation),
    defaultValues:{
      name: '',
      username: '',
      email: '',
      password: '',

    }
  })
  

  const signUp = async (userData:SignUpProps) => {
    try {
      const response = await fetch(`${APP_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json(); 
  
      if (!response.ok) {
     
        toast(data.message || 'Registration failed');
        return; 
      }
  
      console.log(data);
      toast(data.message);

      setTimeout(() => {
        navigate('/sign-in'); 
      }, 3000); 
  
      return data;
  
    } catch (error) {
     
      console.error('Error during registration:', error);
      toast('An error occurred during registration.');
    }
  };

  
  const mutation = useMutation({
  // @ts-expect-error: Temporarily
       mutationFn:(values) => signUp(values)
  })


  async function onSubmit(values: z.infer<typeof SignUpValidation>)  {


  // @ts-expect-error: Temporarily
    mutation.mutate(values);

  }

  return (
    <Form {...form}>
      <Card className='p-2 w-[400px] shadow-md shadow-black/35 border-black border-l-[6px] border-b-[5px] border-l-black  border-b-black'>
      <CardHeader className='p-1 w-full flex text-center'>
        <CardTitle className='font-bold'>Register</CardTitle>
        <CardDescription className='text-gray-600'>Create your account now!</CardDescription>
      </CardHeader>
      <CardContent >
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name
                </FormLabel>
                <FormControl>
                    <Input placeholder='Name' {...field}  />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
            </FormItem>
            )}
          /> 
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Username
                </FormLabel>
                <FormControl>
                    <Input placeholder='Username' {...field}  />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
            </FormItem>
            )}
          />  
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  E-mail
                </FormLabel>
                <FormControl>
                    <Input type='email' placeholder='Email' {...field}  />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
            </FormItem>
            )}
          />  
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password
                </FormLabel>
                <FormControl>
                    <Input type='password' placeholder='Password' {...field}  />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
            </FormItem>
            )}
          />   
          <Button type='submit'>
              Register
          </Button>
        </form>
      </CardContent>
      <CardFooter className='flex gap-2 justify-end'>
          <p className='text-black'>Already have an account?</p>
          <Link to="/sign-in" className='underline'>
            Login
          </Link>
     </CardFooter>
      </Card>
    </Form>
  )
}

export default SignUpForm