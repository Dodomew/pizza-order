function getRestaurants(): Promise<RestaurantProps[]> {
    const ApiUrl = process.env.REACT_APP_API_URL as string;
    return fetch(`${ApiUrl}/restaurants/`).then((res) => {
        if (!res.ok) {
            throw new Error(res.statusText)
        }
        return res.json() as Promise<RestaurantProps[]>
    })
}

function getRestaurantMenu(id : string) : Promise<RestaurantMenuProps[]> {
    const ApiUrl = process.env.REACT_APP_API_URL as string;
    return fetch(`${ApiUrl}/restaurants/${id}/menu`).then((res) => {
        if (!res.ok) {
            throw new Error(res.statusText)
        }
        return res.json() as Promise<RestaurantMenuProps[]>
    })
}

export { getRestaurants, getRestaurantMenu }