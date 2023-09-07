import React, { PropsWithChildren } from "react";
import * as allServices from "../services/index";

export type AllServices = typeof allServices;

const ServiceProviderContext = React.createContext(allServices);

/**
 *  Service provider pattern 
 *  I much prefer doing this over mocking 
 * 
 */
export function ServiceProvider(props: PropsWithChildren<Partial<AllServices>>) {
    const { children, ...rest } = props;
    return <ServiceProviderContext.Provider value={{
        ...allServices,
        ...rest
    }}>
        {props.children}
    </ServiceProviderContext.Provider>
}
export const useServices = () => {
    return React.useContext(ServiceProviderContext);
};
