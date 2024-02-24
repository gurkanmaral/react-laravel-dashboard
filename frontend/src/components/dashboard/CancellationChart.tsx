import { format, parseISO, startOfMonth } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';


import Chart from "react-apexcharts";
import { useGetCancellationData } from '@/lib/react-query/queriesAndMutations';
import ReactApexChart from 'react-apexcharts';

const CancellationChart = () => {

    
    // const [data,setData] = useState([]);

    const currentDate = new Date();
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
      })

      const {data:cancellationData,isLoading} = useGetCancellationData();



    //   useEffect(() => {
    //     // Determine the URL based on whether dates are selected
    //     let url = 'http://localhost/api/get-cancellation-data';
    //     if (date.from && date.to) {
    //         const formattedFromDate = format(date.from, 'yyyy-MM-dd');
    //         const formattedToDate = format(date.to, 'yyyy-MM-dd');
    //         url += `?startDate=${formattedFromDate}&endDate=${formattedToDate}`; 
    //     }
    
    //     // Fetch data using the determined URL
    //     fetch(url)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('error from backend');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
          
    //         if(date?.from && date?.to)
    //         {
    //             console.log(data);
    //             setData(data);
    //         }else{
               
    //             setData(data);
    //         }
    //     })
    //     .catch(error => {
    //         console.error('There has been a problem with your fetch operation:', error);
    //     });
    // }, [date?.from, date?.to]);


const cancellation = cancellationData ? cancellationData?.map((item)=>item.cancellation_reason) : [];

const total = cancellationData ? cancellationData?.map((item)=>item.total) : [];



    const state = {
      series: total,
      options: {
        chart: {
          width: 380,
          type: 'pie' as const,
        },
        labels: cancellation,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
           
          
           
        }
      }

    

      const handleReset = () => {
        setDate({
            from: undefined,
            to: undefined
        })
      }


  return (
    <div>
        <Card className='border-2 border-black/75 p-2  m-0 shadow shadow-black/55'>
            <CardHeader>
                <CardTitle>
                    Cancellation Data
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2'>
                        <div className='flex justify-between '>
                           
                        </div>                     
                        <div className='mt-20'>
                        <ReactApexChart options={state.options} series={state.series} type="pie" height={350} />
                        </div>
                </div>
            </CardContent>
        </Card>

    </div>
  )
}

export default CancellationChart