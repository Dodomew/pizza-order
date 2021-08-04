import React from 'react';
import { useEffect } from 'react';
import { getRestaurants } from "../../api/endpoints"

const RestaurantOverview = () => {
    const [restaurants, setRestaurants] = React.useState<RestaurantProps[] | null>(null);

    useEffect(() => {
        getRestaurants().then((data) => {
            setRestaurants(data);
        })
    }, [])

    return (
        <div>
            <h3>List pizza</h3>
            <ul>
                {restaurants && restaurants.length && (
                    restaurants?.map((restaurant) => {
                        return (
                            <li>
                                {restaurant.name}
                            </li>
                        )
                    })
                )}
            </ul>
        </div>
    )
}

export default RestaurantOverview;