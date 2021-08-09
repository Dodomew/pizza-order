type RestaurantProps = {
    "address1": string,
    "address2": string,
    "id": number,
    "latitude": number,
    "longitude": number,
    "name": string,
    "distance"?: number
}

type RestaurantMenuProps = {
    "id": number,
    "category": string,
    "name": string,
    "topping": string[]
    "price": number,
    "rank": number
}

type RequestOptionsCartItem = {
  menuItemId: number,
  quantity: number
}

type RequestOptions = {
    method: string,
    headers: { 'Content-Type': 'application/json' },
    body: string
}

interface InitialCartState {
    cart: CartItemProps[];
    checkout: boolean;
    total: string;
    itemCount: number;
    restaurantId: string;
    orderDetails: OrderDetails
  }

  type OrderDetails = {
    orderId: number,
    totalPrice: number,
    orderedAt: string, 
    esitmatedDelivery: string,
    status: string
  }

type CartItemProps = {
    menuItemId: number;
    quantity: number;
    price: number;
    name: string;
  };