import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Chart from "react-apexcharts";
import { Button } from '../ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useGetInventoryLevels } from '@/lib/react-query/queriesAndMutations';

const GetInventoryLevels = () => {

    const [filters, setFilters] = useState({
        category: '',
        brand: '',
        color: '',
    });

    const { data: inventoryLevels } = useGetInventoryLevels(filters);




const handleFilterChange = (value, filterType) => {
    setFilters(prevFilters => {
      
        if (value === "All") {
            const {[filterType]: _, ...rest} = prevFilters; 
            return {...rest};
        }
        return {...prevFilters, [filterType]: value};
    });
};
const seriesData = inventoryLevels ? inventoryLevels?.map(item => item.numberInStock) : [];
const categoriesData = inventoryLevels ? inventoryLevels?.map(item => item.title) : [];


const state = {
    series: [{
        name: 'Inventory Levels',
        data: seriesData,
      }],
    options:{
        chart: {
            height: 350,
            type: 'bar',
          },
          stroke: {
            width: [0,3],
          },
          colors: ['#00A36C'],
        toolbar: {
          show: true,
        },
        // legend: {
        //           position: 'top',
        //           horizontalAlign: 'center',
        //           offsetX: 0,
        //           markers:{
        //               radius:[3,3,],
        //               width:[10,10,10],
        //               height:[10,10,10]
        //           },
        //       },
        plotOptions: {
                  bar: {
                      horizontal: false,
                      columnWidth: '55%',
                    borderRadius: 1,      
                  },			                
              },
        xaxis: {
           categories:categoriesData,
           labels: {
            show: false 
        }
        },
        dataLabels: {
          enabled: false,
          enabledOnSeries: [0]
        },
        yaxis: [
          {
          
            seriesName: 'Inventory Levels',
            title: {
              text: 'Inventory Levels',
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

  const handleResetFilters =() => {
    setFilters({
        category: '',
        brand: '',
        color: '',
    })
  }
  

  return (
    <div>
       <Card className="border-2 border-black/75 p-2  m-0 shadow shadow-black/55">
        <CardHeader>
            <CardTitle className='w-full flex'>
                Inventory Levels
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className='flex flex-col gap-2'>
                <div className=' justify-between grid grid-cols-4 gap-4'>
                    <div>
                        <Select onValueChange={(e) => handleFilterChange(e, 'category')} >
                            <SelectTrigger className='border-black shadow-sm shadow-black/15'>
                            <SelectValue placeholder="Category">
                                {filters.category || "Category"}
                            </SelectValue>
                            </SelectTrigger>
                            <SelectContent >
                                    <SelectItem value="All">All</SelectItem>
                                    <SelectItem value="laptops">Laptops</SelectItem>
                                    <SelectItem value="desktops">Desktops</SelectItem>
                                    <SelectItem value="phones">Phones</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Select onValueChange={(e) => handleFilterChange(e, 'brand')}>
                            <SelectTrigger className='border-black shadow-sm shadow-black/15'>
                            <SelectValue placeholder="Brand">
                                {filters.brand || "Brand"}
                            </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                     <SelectItem value="All">All</SelectItem>
                                    <SelectItem value="Apple">Apple</SelectItem>
                                    <SelectItem value="MSI">MSI</SelectItem>
                                    <SelectItem value="Monster">Monster</SelectItem>
                                    <SelectItem value="Samsung">Samsung</SelectItem>
                                    <SelectItem value="Huawei">Huawei</SelectItem>                         
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Select onValueChange={(e) => handleFilterChange(e, 'color')}>
                            <SelectTrigger className='border-black shadow-sm shadow-black/15'>
                                    <SelectValue placeholder="Color">
                                        {filters.color || "Color"}
                                    </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                    <SelectItem value="All">All</SelectItem>
                                    <SelectItem value="black">Black</SelectItem>
                                    <SelectItem value="white">White</SelectItem>
                                    <SelectItem value="red">Red</SelectItem>
                                    <SelectItem value="gray">Gray</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                 <Button
                  onClick={handleResetFilters}
                  variant={"destructive"}>
                    Reset Filters
                  </Button>
                </div>
                <Chart
                series={state.series as any}
                options={state.options as any}
                type={'bar'}
                height={state.options.chart?.height as any}
                />
            </div>
        </CardContent>
       </Card>

    </div>
  )
}

export default GetInventoryLevels