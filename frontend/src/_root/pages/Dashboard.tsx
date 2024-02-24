
import CancellationChart from "@/components/dashboard/CancellationChart";
import CountryChart from "@/components/dashboard/CountryChart";
import DeliveredTimeChart from "@/components/dashboard/DeliveredTimeChart";
import GetInventoryLevels from "@/components/dashboard/GetInventoryLevels";
import GetTotalOrdersByDate from "@/components/dashboard/GetTotalOrdersByDate";
import GetUserByMonth from "@/components/dashboard/GetUserByMonth";
import MostBoughProduct from "@/components/dashboard/MostBoughProduct";
import ReviewChart from "@/components/dashboard/ReviewChart";
import SocialMediaChart from "@/components/dashboard/SocialMediaChart";
import TotalComments from "@/components/dashboard/TotalComments";
import TotalLikes from "@/components/dashboard/TotalLikes";
import TotalRevenueChart from "@/components/dashboard/TotalRevenue";

const Dashboard = () => {

  return (
    <div className='w-full h-full p-4 ml-2 '>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 w-full mt-10 ">
         <GetUserByMonth />
         <GetInventoryLevels />
         <GetTotalOrdersByDate />
         <MostBoughProduct />
         <CountryChart />
         <DeliveredTimeChart />
         <CancellationChart />
         <TotalRevenueChart />
         <ReviewChart />
         <SocialMediaChart />
         <TotalLikes />
         <TotalComments/>
      </div>
    </div>
  )
}

export default Dashboard