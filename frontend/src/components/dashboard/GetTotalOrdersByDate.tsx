import { format } from 'date-fns';
import React from 'react'
import { DateRange } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';


import Chart from "react-apexcharts";
import { useGetTotalOrders } from '@/lib/react-query/queriesAndMutations';

interface Orders {
  date: string;
  order_count:number;
  total_bought_products:number;
}

const GetTotalOrdersByDate = () => {

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
      })


const fromDatee = date?.from ? format(date.from, 'yyyy-MM-dd') : '';
const toDatee = date?.to ? format(date.to, 'yyyy-MM-dd') : '';


const {data:orders} = useGetTotalOrders(fromDatee,toDatee)


    //   useEffect(() => {
       
    //     let url = 'http://localhost/api/order-count';
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
    //             const groupedData = groupDataByMonth(data);
    //             setData(groupedData);
    //         }
    //     })
    //     .catch(error => {
    //         console.error('There has been a problem with your fetch operation:', error);
    //     });
    // }, [date?.from, date?.to]);

  

    const dates = orders ? orders?.map((item:Orders) => item.date) : [];

    const totalBoughtProducts = orders ? orders?.map((item:Orders) => item.total_bought_products) : [];

    const totalOrders= orders ? orders?.map((item:Orders)=>item.order_count) : [];

    const state = {
        series: [{
            name: 'Total Products',
            data: totalBoughtProducts,
            type: 'column',
          },
        {
          name:"total orders",
          data:totalOrders,
          type: 'line',
        }],
        options:{
          colors: ['#A52A2A', '#28282B'], 
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
                          radius:[3,3],
                          width:[10,10],
                          height:[10,10]
                      },
                  },
            plotOptions: {
                      bar: {
                          horizontal: false,
                          columnWidth: '100%',
                        borderRadius: 4,      
                      },			                
                  },
            xaxis: {
               categories: dates,
               type: 'datetime',
              
              labels: {
                style: {
                  colors: ['#28282B'],
                  fontSize: '12px',
                  fontWeight: 400,
              },
                hideOverlappingLabels: true,
                trim: true,
                datetimeFormatter: {
                  year: 'yyyy',
                  month: 'MMM \'yy',
                  day: 'dd MMM',
                  hour: 'HH:mm'          
                },
    }
            },
            dataLabels: {
              enabled: false,
              enabledOnSeries: [0]
            },
            yaxis: [
              {
                
                seriesName: 'Total Products',
                title: {
                  text: 'Total Products',
                  style: {
                    color: '#A52A2A',
                    fontSize: '12px',
                    fontWeight: 600,        
                },
                },
                axisTicks: {
                  show: false,
                },
               
                labels: {
                  style: {
                    colors: '#A52A2A',
                  },
                },
              },
              {
                seriesName: 'total orders',
                opposite: true,
                title: {
                  text: 'total orders',
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
                    colors: '#28282B',
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
    <div
    >
        <Card className="border-2 border-black/75 p-2  m-0 shadow shadow-black/55">
            <CardHeader>
                <CardTitle>
                    Total Orders
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2'>
                        <div className='flex justify-between '>
                            <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            id="date"
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
                                    <Button onClick={handleReset} variant={'destructive'}>
                                        Reset filter
                                    </Button>
                            </div>
                        </div>                     
                        <div>
                        <Chart
                         // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            series={state.series as any} options={state.options as any} type={'line'} height={state.options.chart?.height as any}
                            />
                        </div>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default GetTotalOrdersByDate