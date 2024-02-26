import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Chart from "react-apexcharts";
import { useGetReviews } from '@/lib/react-query/queriesAndMutations';

interface Review {
  title:string;
  average_rating:number;
}

const ReviewChart = () => {

  const {data:reviewData} = useGetReviews();

 const titles = reviewData ? reviewData?.map((item:Review)=>item.title) : [];

 const average = reviewData ? reviewData?.map((item:Review)=>item.average_rating): [];

    const state = {
        series: [{
            name: 'Average',
            data: average,
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
               categories: titles,  
            },
            dataLabels: {
              enabled: false,
              enabledOnSeries: [0]
            },
            yaxis: [
              {
                
                seriesName: 'Average Review',
                title: {
                  text: 'Average Review',
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
        <Card className='border-2 border-black/75 p-2  m-0 shadow shadow-black/55'>
            <CardHeader>
                <CardTitle>
                    Reviews
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
                            series={state.series as any} options={state.options as any} type={'bar'} height={state.options.chart?.height as any}
                            />
                        </div>
                </div>
            </CardContent>
        </Card>

    </div>
  )
}

export default ReviewChart