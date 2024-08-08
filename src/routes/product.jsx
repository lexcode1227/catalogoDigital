import { useState, useEffect } from 'react'
import { Carousel } from "flowbite-react";
import ProductCard from "../components/ProductCard";
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/style.css';
import { SlSizeFullscreen } from "react-icons/sl";
import { useLoaderData } from 'react-router-dom';
import useStore from '../store/store';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import SimpleGallery from '../libs/photoSwipe';
import { Table } from "flowbite-react";

const ProductPage = () => {
    // const [carouselImages, setCarouselImages] = useState([])
    const [relatedProducts, setRelatedProducts] = useState([])
    const productInformation = useLoaderData();
    const addToCart = useStore((state) => state.addToCart)
    const products = useStore((state) => state.products)
    const product = productInformation;

    const addProductToCart = ()=> {
        addToCart(product)
    }

    useEffect(()=>{
        setRelatedProducts(products.filter(item => item.subCategory === product.subCategory && item.category === product.category && item._id !== product._id))
    },[product])
  return (
    <>
        <section className='flex flex-col justify-center items-center relative'>
            <div className="h-96 sm:h-[35rem] lg:h-[40rem] w-full max-w-[710px]">
                <Carousel slide={false} leftControl={<FaChevronLeft color='black'/>} rightControl={<FaChevronRight color='black'/>} >
                    {product.images.map((item, index)=> (
                        <article key={index}>
                            <img src={item} alt={'imagen del producto'} className='object-fill'/>
                        </article>
                    ))}
                </Carousel>
            </div>
            <div className="w-full max-w-[710px] px-4 mx-auto 2xl:px-0">
                <div className="lg:grid lg:gap-8 xl:gap-16">
                    <div className="mt-6 sm:mt-8 lg:mt-0">
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                            {product.name}
                        </h1>
                        <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                            <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                                ${product.price.toFixed(2)}
                            </p>
                        </div>
                        {/* <div className="overflow-x-auto"> */}
                            <Table className='max-w-full my-6'>
                                <Table.Head className='text-gray-900 text-title'>
                                    <Table.HeadCell className='text-title capitalize '>Tallas</Table.HeadCell>
                                    <Table.HeadCell className='text-title capitalize '>Colores</Table.HeadCell>
                                    <Table.HeadCell className='text-title capitalize '>Stock</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y text-gray-900 text-title">
                                    {product.stockInfo.map((item, index)=> (
                                        <Table.Row className="bg-white" key={index+item.lenght}>
                                            <Table.Cell className="whitespace-nowrap font-bold text-gray-900">
                                                {item.size}
                                            </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap font-bold text-gray-900">{item.color}</Table.Cell>
                                            <Table.Cell className="whitespace-nowrap font-bold text-gray-900">{item.stock}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        {/* </div> */}

                        <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                            <button className="w-full text-white mt-4 sm:mt-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-title px-5 py-2.5 flex items-center justify-center" onClick={addProductToCart}>
                                <svg className="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"/>
                                </svg>
                                Add to cart
                            </button>
                        </div>

                        <hr className="my-6 md:my-8 border-gray-200" />

                        <p className="mb-6 text-gray-500 text-title text-justify">{product.description}</p>
                    </div>
                </div>
            </div> 
        </section> 
        <section className='flex flex-col justify-center items-center my-14'>
            <div className="flex flex-col justify-between gap-4 max-w-[710px]">
                <h3 className="text-center text-4xl font-bold">Podrian gustarte</h3>
                <div className="grid grid-cols-2 gap-5">
                  {relatedProducts.map((item)=> (
                    <ProductCard key={item._id} title={item.name} productImage={item.images[0]} price={item.price} linkTo={item._id} />
                  ))}
                </div>
            </div>
        </section>
    </>

  )
}

export default ProductPage