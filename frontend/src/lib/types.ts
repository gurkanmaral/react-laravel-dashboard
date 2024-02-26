export default interface Filters {
    category: string;
    brand: string;
    color: string;
}


  


interface OrderPageProduct {
    id: number;
    title: string;
    price: string; 
    brand: string;
    color: string;
}
interface OrderPageItemProps {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    product: OrderPageProduct;
}

interface OrderPageUserProps {
 id:number;
 email: string;
}

export default interface OrderPageItem {
    id: number;
    user_id: number;
    user: OrderPageUserProps;
    status: string;
    payment_method: string;
    shipping_address: string;
    tracking_number: string;
    notes: string;
    totalPrice: string; 
    quantity: number; 
    order_items: OrderPageItemProps[];
    created_at: string;
    updated_at: string; 
    delivery_time: string | null; 
    cancellation_reason: string | null;
}

