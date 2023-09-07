import React from 'react';
import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ServiceProvider } from './providers/ServiceProvider';
import { OrderList } from './components/OrderList';
import { CustomerList } from './components/CustomerList';


const queryClient = new QueryClient({

})

function App() {

  return (
    <ServiceProvider>
      <QueryClientProvider client={queryClient}>

        <main>
          <CustomerList />
          <OrderList />
        </main>
      </QueryClientProvider >
    </ServiceProvider >
  );
}

export default App;
