import Cookies from "js-cookie";
import axios from "axios";
import { format, parseISO, startOfMonth } from 'date-fns';
import Filters from "./types";

const APP_URL = process.env.LARAVEL_URL;


export async function getCurrentUser()
{
    const token = Cookies.get('dashboard_token')

   try {
    const response = await fetch(`${APP_URL}/api/user`,{
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      });

      if(response.ok)
      {
        const data = await response.json();
        
        return data;
      }else{
        throw new Error('Failed to fetch data');
      }
   } catch (error) {
     console.log(error)
   }
}

export async function signOutUser()
{
    const token = Cookies.get('dashboard_token')

    try {

        const response = await fetch(`${APP_URL}/api/logout`,{
          method:'POST',
            headers: {
                'Authorization' : `Bearer ${token}`
              }
        })

        if(response.ok)
        {
          const data = await response.json();
          Cookies.remove('dashboard_token');
          console.log(data);
          return data;
          
        }else{
          throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.log(error)
    }
}


export async function getAllUsers(fromDate:string,toDate:string)
{

  let apiUrl = `${APP_URL}/api/users-by-month`;

  if (fromDate && toDate) {
    
    apiUrl += `?from=${fromDate}&to=${toDate}`;
  }

  try {
    const response = await axios.get(apiUrl);

    return response.data;
      
  } catch (error) {
    console.log(error)
    throw error;
  }
}


export async function getInventoryLevels(filters:Filters)
{
  let apiUrl = `${APP_URL}/api/inventory-levels`;


      const queryParams = new URLSearchParams(
        Object.entries(filters)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, value]) => value !== '')
      ).toString();


    apiUrl= `${APP_URL}/api/inventory-levels?${queryParams}`

    try {
        const response = await axios.get(apiUrl)

        return response.data;
    } catch (error) {
      console.log(error)
      throw error;
    }

}



export async function getTotalOrders(fromDate:string,toDate:string)
{
  let url = `${APP_URL}/api/order-count`;

  if (fromDate && toDate) {
    url += `?startDate=${fromDate}&endDate=${toDate}`; 
}

    try {
        const response = await axios.get(url);

        if(fromDate && toDate)
        {
          return response.data;
        }
        else{
          const groupedData = groupDataByMonth(response.data);
          return groupedData
        }

   
    } catch (error) {
      console.log(error)
      throw error;
    }

}
interface Item {
  date: string; 
  total_bought_products: string; 
  order_count: number;
}

interface GroupedData {
  date: string;
  total_bought_products: number;
  order_count: number;
}

const groupDataByMonth = (data:Item[]) => {

  const grouped = data.reduce((acc:Record<string, GroupedData>, item: Item) => {
    const month = format(startOfMonth(parseISO(item.date)), 'yyyy-MM');
    if (!acc[month]) {
      acc[month] = { date: month, total_bought_products: 0,order_count: 0 };
    }
    acc[month].total_bought_products += parseInt(item.total_bought_products);
    acc[month].order_count += item.order_count;
    return acc;
  }, {});

  return Object.values(grouped);
};

export async function mostBoughtProducts ()  {
   
  try {
    const response = await axios.get(`${APP_URL}//api/most-bought-product`);

  
      return response.data;
    
    
  } catch (error) {
    console.log(error)
    throw error;
  }


}

export async function getCountryData()
{
  try {
    const response = await axios.get(`${APP_URL}/api/get-countries-data`);

  
    return response.data;
  
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function getDeliveryTime()
{


  try {
    const response = await axios.get(`${APP_URL}/api/get-delivered-data`);

  
    return response.data;
  
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function getCancellationData()
{

  try {
    const response = await axios.get(`${APP_URL}/api/get-cancellation-data`);

  
    return response.data;
  
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function getRevenue(fromDate:string,toDate:string)
{
  let url = `${APP_URL}/api/get-total-revenue`;

  if (fromDate && toDate) {
    url += `?startDate=${fromDate}&endDate=${toDate}`; 
}
try {
  const response = await axios.get(url);

  return response.data;
    
} catch (error) {
  console.log(error)
  throw error;
}


}
export async function getReviews()
{

  try {
    const response = await axios.get(`${APP_URL}//api/get-average-ratings`);
  
    return response.data;
      
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function getTotalFollow(fromDate:string,toDate:string)
{
  let url = `${APP_URL}/api/get-total-follows`;

  if (fromDate && toDate) {
    url += `?startDate=${fromDate}&endDate=${toDate}`; 
}
try {
  const response = await axios.get(url);

  return response.data;
    
} catch (error) {
  console.log(error)
  throw error;
}


}
export async function getTotalLikes(fromDate:string,toDate:string)
{
  let url = `${APP_URL}/api/get-total-likes`;

  if (fromDate && toDate) {
    url += `?startDate=${fromDate}&endDate=${toDate}`; 
}
try {
  const response = await axios.get(url);

  return response.data;
    
} catch (error) {
  console.log(error)
  throw error;
}
}
export async function getTotalComments(fromDate:string,toDate:string)
{
  let url = `${APP_URL}/api/get-total-comments`;

  if (fromDate && toDate) {
    url += `?startDate=${fromDate}&endDate=${toDate}`; 
}
try {
  const response = await axios.get(url);

  return response.data;
    
} catch (error) {
  console.log(error)
  throw error;
}
}

export async function getAllUsersInUserPage(page:number, searchTerm:string)
{

  try {
    const response = await axios.get(`${APP_URL}/api/get-all-users`, {
        params: { page, search: searchTerm },
    });
    return response.data;
} catch (error) {
    console.log(error);
    throw error;
}
}

export async function deleteUser(id:number)
{

  try {
      const response = await axios.delete(`${APP_URL}/api/user/${id}`)

      return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }

}

interface FilterState {
  status?: string;
  search?:string;
  
}

export async function getOrderDetails(page:number,filters:FilterState)
{
  let apiUrl = `${APP_URL}/api/get-order-details`;
  try {
    // @ts-expect-error asda
    const queryParams = new URLSearchParams(filters).toString();
    
    apiUrl= `${APP_URL}/api/get-order-details?${queryParams}`
    const response = await axios.get(apiUrl,{
      params :{page:page}
    })

    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
}
interface ProductFilters {
  category?: string;
  brand?: string;
  color?: string;
  search?: string;
}

export async function getProductDetails(filters:ProductFilters,page:number)
{
  let apiUrl = `${APP_URL}/api/get-product-details`;
  try {
    // @ts-expect-error asda
    const queryParams = new URLSearchParams(filters).toString();
    apiUrl= `${APP_URL}/api/get-product-details?${queryParams}`

    const response = await axios.get(apiUrl, {
      params: {page:page}
    })

    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function getCountryDetails()
{
  try {
    const response = await axios.get(`${APP_URL}/api/get-country-details`)

    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function getReviewDetails(page:number)
{
  try {
    const response = await axios.get(`${APP_URL}/api/get-review-details`,{
      params: {page:page}
    })

    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function addStock({ id, stock }:{id:number,stock:number})
{
  try {
    const response = await axios.post(`${APP_URL}/api/add-stock/${id}`,{
      stock:stock
    })

    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function getRevenueInPage()
{
  try {
      const response = await axios.get(`${APP_URL}/api/get-revenue`)
      return response.data
  } catch (error) {
    console.log(error)
    throw error;
  }
}