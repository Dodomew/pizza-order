function getRestaurants(): Promise<RestaurantProps[]> {
  const ApiUrl = process.env.REACT_APP_API_URL as string;
  return fetch(`${ApiUrl}/restaurants/`).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json() as Promise<RestaurantProps[]>;
  });
}

function getSingleRestaurant(id: string): Promise<RestaurantProps> {
  const ApiUrl = process.env.REACT_APP_API_URL as string;
  return fetch(`${ApiUrl}/restaurants/${id}`).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json() as Promise<RestaurantProps>;
  });
}

function getRestaurantMenu(id: string): Promise<RestaurantMenuProps[]> {
  const ApiUrl = process.env.REACT_APP_API_URL as string;
  return fetch(`${ApiUrl}/restaurants/${id}/menu`).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json() as Promise<RestaurantMenuProps[]>;
  });
}

function postOrder(requestOptions: RequestOptions): Promise<OrderDetails> {
  const ApiUrl = process.env.REACT_APP_API_URL as string;
  return fetch(`${ApiUrl}/orders/`, requestOptions).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json() as Promise<OrderDetails>;
  });
}

export { getRestaurants, getSingleRestaurant, getRestaurantMenu, postOrder };
