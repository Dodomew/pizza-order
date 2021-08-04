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
        <div className="main">
            <h3>Pizza restaurants near you</h3>
            {restaurants && restaurants.length && (
                <ul>
                    {restaurants?.map((restaurant) => {
                        return (
                            <li key={`${restaurant.name}_${restaurant.id}`}>
                                {restaurant.name}
                            </li>
                        )
                    })}
                </ul>
            )}

        </div>
    )
}

export default RestaurantOverview;