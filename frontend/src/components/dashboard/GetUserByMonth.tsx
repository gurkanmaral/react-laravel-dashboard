import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { Component, useEffect, useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
import { addDays, format } from "date-fns"

import Chart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { useGetAllUser, usegetAllUser } from "@/lib/react-query/queriesAndMutations";




const GetUserByMonth = () => {


    const [date, setDate] = React.useState<DateRange | undefined>({
      from: undefined,
      to: undefined,
    })

    const fromDatee = date.from ? format(date?.from, 'yyyy-MM-dd') : undefined; 
    const toDatee = date?.to ? format(date?.to, 'yyyy-MM-dd') : undefined; 

    const {data:users} = useGetAllUser(fromDatee,toDatee)

 

    const counts = users ? users?.map((item)=>item.count) : [];

   const labels = users ? users?.map(item => {
    const monthName = new Date(item.year, item.month - 1).toLocaleString('en-US', { month: 'short' });
    const shortYear = item.year.toString().slice(-2); 
   return `${monthName} ${shortYear}`; 
  }) : [];
 
  const cumulativeCounts = counts ? counts?.reduce((acc, current, index) => {
    if (index === 0) {
      acc.push(current);
    } else {
      acc.push(acc[index - 1] + current);
    }
    return acc;
}, []) : []; 


  const state = {
    series: [{
      name: 'New Users',
      data: counts ||[],
      type: 'column',
    },
    {
      name: 'Total Users',
      data: cumulativeCounts ||[],
      type: 'line',
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
                      width:[10,10],
                      height:[10,10]
                  },
              },
        plotOptions: {
                  bar: {
                      horizontal: false,
                      columnWidth: '55%',
            borderRadius: 3,
            
                  },			
                  
              },
        xaxis: {
          categories: labels || [],
          labels:{
            offsetX: 0,
            offsetY: 5,
          }
        },
        dataLabels: {
          enabled: false,
          enabledOnSeries: [0]
        },
        yaxis: [
          {
         
            seriesName: 'New Users',
            title: {
              text: 'Monthly Users',
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
          {
            // Second y-axis for the line chart
            seriesName: 'Total Users',
            opposite: true,
            title: {
              text: 'Total Users',
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
                colors: '#00E396',
              },
            },
            
          },
        ],
    }
  }
  
  const handleResetFilters = () => {
    setDate({
      from: undefined,
      to: undefined,
    })
  }
  return (
    <div>
          <Card className="border-2 border-black/75 p-2  m-0 shadow shadow-black/55">
          <CardHeader className=" ">
              <CardTitle className="w-full flex">Users</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
              <div className="flex justify-between ">
              <div className="flex ">
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
             </div>
              <div> 
                  <Button
                  onClick={handleResetFilters}
                  variant={"destructive"}>
                    Reset Filters
                  </Button>
              </div>
              </div>
              <Chart
              series={state.series as any}
              options={state.options as any}
              type={'line'}
              height={state.options.chart?.height as any}
            />
          </CardContent>
        </Card>

    </div>
  )
}

export default GetUserByMonth