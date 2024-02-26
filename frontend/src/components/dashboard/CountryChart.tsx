import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Chart from "react-apexcharts";
import { useGetCountryData } from '@/lib/react-query/queriesAndMutations';

interface Countries {
  shipping_address: string;
  total:number;
}

const CountryChart = () => {
  
  const {data:countries} = useGetCountryData();

 const address = countries ? countries.map((item:Countries)=>item.shipping_address) : [];

 const total = countries ?  countries.map((item:Countries)=>item.total) : [];


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
                         // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            series={state.series as any}
                             // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            options={state.options as any}
                            type={'bar'}
                             // eslint-disable-next-line @typescript-eslint/no-explicit-any
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