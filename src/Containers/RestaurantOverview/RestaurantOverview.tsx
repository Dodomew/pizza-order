import React from "react";
import { useEffect } from "react";
import { getRestaurants } from "../../api/endpoints";
import useGeolocation from "../../hooks/useGeolocation";
import { Link } from "react-router-dom";
import "./restaurantOverview.scss";

// https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

const RestaurantOverview = () => {
  const [restaurants, setRestaurants] = React.useState<
    RestaurantProps[] | null
  >(null);
  const coords = useGeolocation();

  useEffect(() => {
    let componentIsMounted = true; // guard vs async mem leak
    getRestaurants().then((restaurants) => {
      if (coords.latitude !== 0) {
        const updatedRestaurants = restaurants.map((restaurant) => {
          const distanceInKm = getDistanceFromLatLonInKm(
            coords.latitude,
            coords.longitude,
            restaurant.latitude,
            restaurant.longitude
          );
          const updatedRestaurant = {
            ...restaurant,
            distance: parseFloat(distanceInKm.toFixed(1)),
          };

          return updatedRestaurant;
        });

        updatedRestaurants.sort((restaurantA, restaurantB) => {
          return restaurantA.distance - restaurantB.distance;
        });

        restaurants = updatedRestaurants;
      }

      if (componentIsMounted) {
        setRestaurants(restaurants);
      }
    });
    return () => {
      componentIsMounted = false;
    };
  }, [coords.latitude, coords.longitude]);

  return (
    <div className="overview">
      {restaurants && restaurants.length ? (
        <ul className="overview-list">
          {restaurants.map((restaurant) => {
            return (
              <li
                key={`${restaurant.name}_${restaurant.id}`}
                className="overview-list-item"
              >
                <Link
                  to={`restaurants/${restaurant.id}`}
                  className="overview-list-item__wrapper"
                >
                  <div
                    className="overview-list-item__media"
                    style={{
                      backgroundImage:
                        "url(https://via.placeholder.com/640x480)",
                    }}
                  ></div>
                  <div className="overview-list-item__content">
                    <h4 className="overview-list-item__title">
                      {restaurant.name}
                      {restaurant.distance && (
                        <span className="overview-list-item__byline">{`(${restaurant.distance}km)`}</span>
                      )}
                    </h4>
                    <p className="overview-list-item__address">
                      {restaurant.address1}
                    </p>
                    <p className="overview-list-item__address">
                      {restaurant.address2}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};

export default RestaurantOverview;
