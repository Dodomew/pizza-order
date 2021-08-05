import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantMenu } from "../../api/endpoints";

const RestaurantDetailView = () => {
    const [menu, setMenu] = React.useState<RestaurantMenuProps[]>([])
    const { id } = useParams< { id : string }>();
    
    useEffect(() => {
        let componentIsMounted = true;

        getRestaurantMenu(id).then((menu) => {
            if(componentIsMounted) {
                setMenu(menu);
            }
        });

        return () => { 
            componentIsMounted = false 
        }
    }, [id])

    return (
        <>
        <h1>The menu</h1>
        {menu && menu.length ? (
            <ul>
                {  menu.map((menuItem) => {
                    return (
                        <li>
                            <h4>{menuItem.name}</h4>
                            <p>{menuItem.price}</p>
                            {menuItem.topping && menuItem.topping.length ? (
                                <ul>
                                    {menuItem.topping.map((topping) => {
                                        return <li>{topping}</li>
                                    })}
                                </ul>
                            ) : null }    
                        </li>
                    )
                })}
            </ul>
          
        ) : null }
        </>
    )
}

export default RestaurantDetailView;