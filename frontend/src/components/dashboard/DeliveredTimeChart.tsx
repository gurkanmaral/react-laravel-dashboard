import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useGetDeliveryTime } from '@/lib/react-query/queriesAndMutations';
import ReactApexChart from 'react-apexcharts';

interface DeliveryData {
  delivery_date:number;
  order_count:number;
}

const DeliveredTimeChart = () => {

  const {data:deliveryData} = useGetDeliveryTime();

const delivery = deliveryData ? deliveryData?.map((item:DeliveryData)=>item.order_count) :  [];

const days = deliveryData ? deliveryData?.map((item:DeliveryData)=>`${item.delivery_date} days`) : [];

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
              position: 'bottom'
            }
          }
        }]
      },
      }


  return (
    <div>
        <Card className='border-2 border-black/75 p-2  m-0 shadow shadow-black/55 '>
            <CardHeader>
                <CardTitle>
                    Delivery Time
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2'>
                        <div className='flex justify-between '>              
                        </div>                     
                        <div className='mt-10'>
                        <ReactApexChart 
                         // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        options={state.options as any } series={state.series} type="donut" height={300}/>
                        </div>
                </div>
            </CardContent>
        </Card>

    </div>
  )
}

export default DeliveredTimeChart