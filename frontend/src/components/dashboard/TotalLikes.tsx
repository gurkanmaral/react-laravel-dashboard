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
import { useGetTotalLikes } from '@/lib/react-query/queriesAndMutations';

const TotalLikes = () => {

    
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

const {data:totalLikes} = useGetTotalLikes(fromDatee,toDatee)

 const likes = totalLikes ? totalLikes?.map((item)=>item.total_likes) : [];

 const dates = totalLikes ?  totalLikes?.map((item)=>item.date) : [];

    const state = {
        series: [{
            name: 'Average',
            data: likes,
            type: 'column',
          },
        
        ],
        options:{
            chart: {
                height: 350,
                type: 'line',
              },
              stroke: {
                width: [0,3],
              },
            toolbar: {
              show: true,
            },
            legend: {
                      position: 'top',
                      horizontalAlign: 'center',
                      offsetX: 0,
                      markers:{
                          radius:[3,3,],
                          width:[10,10,10],
                          height:[10,10,10]
                      },
                  },
            plotOptions: {
                      bar: {
                          horizontal: false,
                          columnWidth: '55%',
                        borderRadius: 1,      
                      },			                
                  },
            xaxis: {
               categories: dates,  
            },
            dataLabels: {
              enabled: false,
              enabledOnSeries: [0]
            },
            yaxis: [
              {
                
                seriesName: 'Total Likes',
                title: {
                  text: 'Total Likes',
                  style: {
                    color: undefined,
                    fontSize: '12px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-yaxis-title',
                },
                },
                axisTicks: {
                  show: false,
                },
               
                labels: {
                  style: {
                    colors: '#008FFB',
                  },
                },
              },           
            ],
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
                    Total Likes
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
                            type={'bar'}
                            height={state.options.chart?.height as any}
                            />
                        </div>
                </div>
            </CardContent>
        </Card>

    </div>
  )
}

export default TotalLikes