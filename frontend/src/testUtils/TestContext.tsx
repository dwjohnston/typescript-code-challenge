import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AllServices, ServiceProvider } from "../providers/ServiceProvider";
import * as allServices from "../services/index";


const DEFAULT_SERVICES = Object.keys(allServices).reduce((acc, cur) => {
    acc[cur as keyof AllServices] = () => {
        throw new Error(`${cur} service not provided`)
    }
    return acc;
}, {} as typeof allServices)



const queryClient = new QueryClient();
export function TestContext(props: React.PropsWithChildren<{
    services: Partial<AllServices>
}>) {
    return <ServiceProvider  {...DEFAULT_SERVICES} {...props.services}>
        <QueryClientProvider client={queryClient}>
            {props.children}
        </QueryClientProvider>
    </ServiceProvider>
}