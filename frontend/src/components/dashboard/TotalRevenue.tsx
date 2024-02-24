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
import { useGetRevenue } from '@/lib/react-query/queriesAndMutations';

const TotalRevenueChart = () => {

    
    const [data,setData] = useState([]);

    const currentDate = new Date();
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
      })

          
const fromDatee = date?.from ? format(date.from, 'yyyy-MM-dd') : [];
const toDatee = date?.to ? format(date.to, 'yyyy-MM-dd') : [];

const {data:revenueData} = useGetRevenue(fromDatee,toDatee)

 

 const revenue = revenueData ? revenueData?.orders?.map((item)=>item.totalPrice) : [];

const dates = revenueData ?  revenueData?.orders?.map((item)=>item.date) : [];

    const state = {
        series: [{
            name: 'Revenue',
            data: revenue,
            type: 'area',        
          },     
        ],
      
        options:{
            chart: {
                height: 350,
                type: 'area',
                zoom: {
                  autoScaleYaxis: true
                }
              },     
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
              }
            },
            xaxis: {
               categories: dates,  
               borderColor: '#999',
               yAxisIndex: 0,
               
            },
            dataLabels: {
              enabled: false,
            },
            markers: {
              size: 0,
              style: 'hollow',
            },
            tooltip: {
              x: {
                format: 'dd MMM yyyy'
              }
            },
           
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
                    Revenue
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2'>
                        <div className='flex justify-between '>
                            <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={""}
                            className={cn(
                            "w-auto justify-start flex gap-2  font-normal",
                            !date && ""
                            )}
                        >
                            <CalendarIcon className=" h-4 w-4" />
                            {date?.from ? (
                            date.to ? (
                                <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                            ) : (
                            <span>Pick a date</span>
                            )}
                        </Button>
                        </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        />
                    </PopoverContent>
                            </Popover>
                            <div>
                                    <Button onClick={handleReset}
                                    variant={'destructive'}>
                                        Reset filter
                                    </Button>
                            </div>
                        </div>                     
                        <div>
                        <Chart
                            series={state.series as any}
                            options={state.options as any}
                            type={'area'}
                            height={state.options.chart?.height as any}
                            />
                        </div>
                </div>
            </CardContent>
        </Card>

    </div>
  )
}

export default TotalRevenueChart