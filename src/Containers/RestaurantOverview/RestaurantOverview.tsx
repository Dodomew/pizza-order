import React from 'react';
import { useEffect } from 'react';
import { getRestaurants } from "../../api/endpoints"
import useGeolocation from '../../hooks/useGeolocation';

// https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180)
}

const RestaurantOverview = () => {
    const [restaurants, setRestaurants] = React.useState<RestaurantProps[] | null>(null);
    const coords = useGeolocation();

    useEffect(() => {
        getRestaurants().then((restaurants) => {
            const updatedRestaurants = restaurants.map((restaurant) => {
                const distanceInKm = getDistanceFromLatLonInKm(
                    coords.latitude, coords.longitude, restaurant.latitude, restaurant.longitude
                );
                const updatedRestaurant = {
                    ...restaurant,
                    distance: distanceInKm.toFixed(1)
                }

                return updatedRestaurant;
            });

            setRestaurants(updatedRestaurants)
        });
    }, [coords.latitude, coords.longitude]);

    return (
        <div className="main">
            <h3>Pizza restaurants near you</h3>
            {restaurants && restaurants.length && (
                <ul className="overview">
                    {restaurants.map((restaurant) => {
                        return (
                            <li key={`${restaurant.name}_${restaurant.id}`} className="overview-item">
                                <div className="overview-item__content">
                                    <img src="https://via.placeholder.com/150" alt={restaurant.name}></img>
                                    <h4 className="overview-item__title">{restaurant.name}</h4>
                                    <p>{restaurant.address1}</p>
                                    <p>{restaurant.address2}</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default RestaurantOverview;