import React from 'react'
import {useSales} from '../../context/SalesContext';


const SalesTable = () => {

    const{sales,loading, getAllSales} = useSales();
    

  return (
    <div>

    </div>
  )
}

export default SalesTable