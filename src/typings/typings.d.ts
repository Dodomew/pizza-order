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
