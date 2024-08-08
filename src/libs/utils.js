import clsx from "clsx";
import { twMerge } from "tailwind-merge";
// import axios from "axios";
// import { API_URL } from '../../config';
import useStore from '../store/store';
import { categoriesList, productsList } from "../../data";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// actualizar y manejar el estado global de Zustand
const fetchProducts = async ()=> {
  const products = useStore.getState().products
  const setProducts = useStore.getState().setProducts
  
  if (products.length === 0) {
    try {
      // const res = await axios.get(`${API_URL}/api/product`)
      // const { data } = res.data
      // setProducts(data)
      setProducts(productsList)

      return productsList
    } catch (err) {
      console.error('Error fetching products:', err)
    }
  }
  return products
}

const fetchCategories = async () => {
  const categories = useStore.getState().categories
  const setCategories = useStore.getState().setCategories

  if (categories.length === 0) {
    try {
      // const res = await axios.get(`${API_URL}/api/category`)
      // const { data } = res.data
      // setCategories(data)
      setCategories(categoriesList)
      return categoriesList
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }
  return categories
}

export const fetchData = async()=> {
  try {
    const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);
    return { products, categories };
  } catch (err) {
    return console.error('Error fetching data:', err);
    // return { products: [], categories: [] };
  }
}

export const findProduct = async (id)=>{
  try {
    const products = useStore.getState().products
    if (products.length !== 0) {      
      const filteredProduct = products.filter(item => item._id === id)
      return filteredProduct[0]
    }
    // const res = await axios.get(`${API_URL}/api/product/${id}`)
    // const { data } = res.data
    // return data
    const filteredProduct = productsList.filter(item => item._id === id)
    return filteredProduct[0]

  } catch (err) {
    console.error('Error fetching categories:', err)
  }
}