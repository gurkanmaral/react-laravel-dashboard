import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie';



const APP_URL = process.env.LARAVEL_URL;

const SignInValidation = z.object({
  email:z.string().email(),
  password: z.string().min(5,{message: 'Password must be at least 8 characters'}).max(50),
})
interface SignInProps {
  email:string;
  password:string;

}


const SignInForm = () => {

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const form = useForm<z.infer<typeof SignInValidation>>({

    resolver: zodResolver(SignInValidation),
    defaultValues:{
      email: '',
      password: '',

    }
  })


  const signIn = async (userData:SignInProps) => {
    const response = await fetch(`http://132.145.246.97/api/login`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(userData),
    });

    if(!response.ok) {
      throw new Error('error')
    }
    
    const data = await response.json();
    
    Cookies.set('dashboard_token',data.token);
    // dispatch(setCredentials({ token: data.token }));
  
    navigate("/")
    
    return data;
    
  }

  const mutation = useMutation({
     // @ts-expect-error: Temporarily
       mutationFn:(values) => signIn(values)
  })



  async function onSubmit(values: z.infer<typeof SignInValidation>)  {

    console.log('Form submitted', values);
  // @ts-expect-error: Temporarily
    mutation.mutate(values)

  }

  return (
    <Form {...form}>
      <Card  className='p-2 w-[400px] shadow-md shadow-black/35 border-black border-l-[6px] border-b-[5px] border-l-black  border-b-black'>
      <CardHeader className='p-1 w-full flex text-center'>
        <CardTitle className='font-bold'>Login</CardTitle>
        <CardDescription className='text-gray-600'>Enter your account!</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>         
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
             Login
          </Button>
        </form>
      </CardContent>
      <CardFooter className='flex gap-2 justify-end'>
          <p className='text-black'>Don't you have an account?</p>
          <Link to="/sign-up" className='underline'>
            Register
          </Link>
     </CardFooter>
      </Card>
    </Form>
  )
}

export default SignInForm