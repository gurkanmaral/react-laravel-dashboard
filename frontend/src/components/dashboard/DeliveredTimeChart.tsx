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
import { useGetDeliveryTime } from '@/lib/react-query/queriesAndMutations';
import ReactApexChart from 'react-apexcharts';

const DeliveredTimeChart = () => {

    
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
      })

      const {data:deliveryData,isLoading} = useGetDeliveryTime();




    


const delivery = deliveryData ? deliveryData?.map((item)=>item.order_count) :  [];

const days = deliveryData ? deliveryData?.map((item)=>`${item.delivery_date} days`) : [];

    const state = {
      series: delivery,
      options: {
        labels: days,
        chart: {
          type: 'donut',
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'top'
            }
          }
        }]
      },
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
                    Delivery Time
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-5'>
                        <div className='flex justify-between '>              
                        </div>                     
                        <div className='mt-10'>
                        <ReactApexChart options={state.options } series={state.series} type="donut" height={350}/>
                        </div>
                </div>
            </CardContent>
        </Card>

    </div>
  )
}

export default DeliveredTimeChart