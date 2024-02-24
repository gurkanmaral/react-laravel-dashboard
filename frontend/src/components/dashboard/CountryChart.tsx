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
import { useGetCountryData } from '@/lib/react-query/queriesAndMutations';

const CountryChart = () => {

    
  

    const currentDate = new Date();
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
      })

      const {data:countries,isLoading} = useGetCountryData();


 const address = countries ? countries.map((item)=>item.shipping_address) : [];

 const total = countries ?  countries.map((item)=>item.total) : [];



    const state = {
        series: [{
            name: 'Total Orders',
            data: total,
            type: 'bar',
          },
        
        ],
        options:{
            chart: {
                height: 350,
                type: 'bar',
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
                          horizontal: true,
                          columnWidth: '55%',
                        borderRadius: 1,      
                      },			                
                  },
            xaxis: {
               categories: address,  
            },
            dataLabels: {
              enabled: false,
              enabledOnSeries: [0]
            },
            yaxis: [
              {              
                seriesName: 'Total Products',
                title: {
                  text: '',
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
        <Card className="border-2 border-black/75 p-2  m-0 shadow shadow-black/55">
            <CardHeader>
                <CardTitle>
                    Country Data
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2'>
                        <div className='flex justify-between '>                       
                            <div>
                                   
                            </div>
                        </div>                     
                        <div className='mt-10'>
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

export default CountryChart