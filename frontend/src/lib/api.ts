import Cookies from "js-cookie";
import axios from "axios";
import { format } from "date-fns";
import { format, parseISO, startOfMonth } from 'date-fns';


export async function getCurrentUser()
{
    const token = Cookies.get('dashboard_token')

   try {
    const response = await fetch('http://localhost/api/user',{
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

        const response = await fetch('http://localhost/api/logout',{
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


export async function getAllUsers(fromDate,toDate)
{

  let apiUrl = 'http://localhost/api/users-by-month';

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

export async function getInventoryLevels(filters)
{
  let apiUrl = 'http://localhost/api/users-by-month';

    const queryParams = new URLSearchParams(filters).toString();
    apiUrl= `http://localhost/api/inventory-levels?${queryParams}`

    try {
        const response = await axios.get(apiUrl)

        return response.data;
    } catch (error) {
      console.log(error)
      throw error;
    }

}



export async function getTotalOrders(fromDate,toDate)
{
  let url = 'http://localhost/api/order-count';

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


const groupDataByMonth = (data) => {
  const grouped = data.reduce((acc, item) => {
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

export async function mostBoughtProducts (fromDate,toDate)  {

  let url = 'http://localhost/api/most-bought-product';

 
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

export async function getCountryData()
{
  let url = 'http://localhost/api/get-countries-data';

  try {
    const response = await axios.get(url);

  
    return response.data;
  
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function getDeliveryTime()
{
  let url = 'http://localhost/api/get-delivered-data';

  try {
    const response = await axios.get(url);

  
    return response.data;
  
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function getCancellationData()
{
  let url = 'http://localhost/api/get-cancellation-data';
  try {
    const response = await axios.get(url);

  
    return response.data;
  
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function getRevenue(fromDate,toDate)
{
  let url = 'http://localhost/api/get-total-revenue';

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
  let url = 'http://localhost/api/get-average-ratings';

  try {
    const response = await axios.get(url);
  
    return response.data;
      
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function getTotalFollow(fromDate,toDate)
{
  let url = 'http://localhost/api/get-total-follows';

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
export async function getTotalLikes(fromDate,toDate)
{
  let url = 'http://localhost/api/get-total-likes';

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
export async function getTotalComments(fromDate,toDate)
{
  let url = 'http://localhost/api/get-total-comments';

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

export async function getAllUsersInUserPage(page, searchTerm)
{

  try {
    const response = await axios.get(`http://localhost/api/get-all-users`, {
        params: { page, search: searchTerm },
    });
    return response.data;
} catch (error) {
    console.log(error);
    throw error;
}
}

export async function deleteUser(id)
{

  try {
      const response = await axios.delete(`http://localhost/api/user/${id}`)

      return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }

}

export async function getOrderDetails(page,filters)
{
  let apiUrl = 'http://localhost/api/get-order-details';
  try {
    const queryParams = new URLSearchParams(filters).toString();
    
    apiUrl= `http://localhost/api/get-order-details?${queryParams}`
    const response = await axios.get(apiUrl,{
      params :{page:page}
    })

    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function getProductDetails(filters,page)
{
  let apiUrl = 'http://localhost/api/get-product-details';
  try {
    const queryParams = new URLSearchParams(filters).toString();
    apiUrl= `http://localhost/api/get-product-details?${queryParams}`

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
    const response = await axios.get(`http://localhost/api/get-country-details`)

    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function getReviewDetails(page)
{
  try {
    const response = await axios.get(`http://localhost/api/get-review-details`,{
      params: {page:page}
    })

    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function addStock({ id, stock })
{
  try {
    const response = await axios.post(`http://localhost/api/add-stock/${id}`,{
      stock:stock
    })

    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
}