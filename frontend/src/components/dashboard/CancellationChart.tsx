import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useGetCancellationData } from '@/lib/react-query/queriesAndMutations';
import ReactApexChart from 'react-apexcharts';

interface Cancellation {
  cancellation_reason:string;
  total:number;
}

const CancellationChart = () => {

      const {data:cancellationData} = useGetCancellationData();

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


const cancellation = cancellationData ? cancellationData?.map((item:Cancellation)=>item.cancellation_reason) : [];

const total = cancellationData ? cancellationData?.map((item:Cancellation)=>item.total) : [];



    const state = {
      series: total,
      options: {
        chart: {
          width: 200,
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


  return (
    <div>
        <Card className='border-2 border-black/75 p-2  m-0 shadow shadow-black/55 '>
            <CardHeader>
                <CardTitle>
                    Cancellation Data
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2'>
                        <div className='flex justify-between '>
                           
                        </div>                     
                        <div className='mt-10'>
                        <ReactApexChart options={state.options} series={state.series} type="pie" height={300} />
                        </div>
                </div>
            </CardContent>
        </Card>

    </div>
  )
}

export default CancellationChart