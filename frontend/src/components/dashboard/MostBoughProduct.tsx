import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Chart from "react-apexcharts";
import { useGetMostBoughtProducts } from '@/lib/react-query/queriesAndMutations';


interface Orders {
  title: string;
  total_bought_products:number;
}

const MostBoughProduct = () => {
    // const [data,setData] = useState([]);

    const currentDate = new Date();
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);


    // const [date, setDate] = React.useState<DateRange | undefined>({
    //   from: undefined,
    //   to: undefined,
    // });
   
      
// const fromDatee = date?.from ? format(date.from, 'yyyy-MM-dd') : [];
// const toDatee = date?.to ? format(date.to, 'yyyy-MM-dd') : [];


const {data:orders} = useGetMostBoughtProducts()


    //   useEffect(() => {
    //     // Determine the URL based on whether dates are selected
    //     let url = 'http://localhost/api/most-bought-product';
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



    
 
    const titles = orders ? orders?.map((item:Orders) => item.title) : [];

    const totalBoughtProducts = orders ? orders?.map((item:Orders) => item.total_bought_products) : [];



      const state = {
        series: [{
            name: 'Total Bought Count',
            data: totalBoughtProducts,
            type: 'bar',
          },
        ],
        options:{
          colors:['#191970'],
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
            plotOptions: {
                      bar: {
                          horizontal: false,
                          columnWidth: '55%',
                        borderRadius: 1,      
                      },			                
                  },
            xaxis: {
               categories: titles,    
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
                
                seriesName: 'Total Products',
                title: {
                  text: 'Total Products',
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

      // const handleReset = () => {
      //   setDate({
      //       from: undefined,
      //       to: undefined
      //   })
      // }
  return (
    <div
    >
        <Card className="border-2 border-black/75 p-2  m-0 shadow shadow-black/55">
            <CardHeader>
                <CardTitle>
                        Most Bought Product
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

export default MostBoughProduct