import React from 'react'
import CategoriesTable from "../components/category/CategoriesTable";
import CategoryForm from '../components/category/categoryForm';


const Categories = () => {
  return (
    <div>

        <CategoryForm />
        <CategoriesTable />
    </div>
  )
}

export default Categories