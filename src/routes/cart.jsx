import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useStore from '../store/store'
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { IoLogoWhatsapp } from "react-icons/io";

const CartShopping = () => {
    const [cart, setCart] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [customerName, setCustomerName] = useState('');
    const [customerProvider, setCustomerProvider] = useState('');
    const totalAmount = useStore((state) => state.totalAmount)
    const cartItems = useStore((state) => state.cartItems)
    const removeFromCart = useStore((state) => state.removeFromCart)
  
    function onCloseModal() {
      setOpenModal(false);
      setCustomerName('');
      setCustomerProvider('');
    }
    const removeProduct = (productId) => {
        removeFromCart(productId)
    }

    const handleSubmit = ()=> {
        console.log({customerName, customerProvider, cart});
        onCloseModal()
    }

    const buildWhatsAppMessage = () => {
        let message = `Hola, mi nombre es ${customerName}, vi tu catálogo por ${customerProvider} y estoy interesado en los siguientes productos:\n\n`;
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} - $${item.price}\nURL: https://openfashion-web.vercel.app/products/${item._id}\n`;
        });
        message += `\nTotal: $${Number(totalAmount).toFixed(2)}`;
        return encodeURIComponent(message); // Encode the message for the URL
      };
    
    const urlW = `https://api.whatsapp.com/send?phone=72754543&text=${buildWhatsAppMessage()}`;

    useEffect(()=> {
        setCart(cartItems)
    }, [cartItems])
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto px-4 2xl:px-0 max-w-[710px]">
            <h2 className="text-4xl font-semibold text-gray-900">Carrito de compras</h2>
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:flex-col lg:items-start xl:gap-8">
                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                    <div className="space-y-6">
                        { (cart.length !== 0) ?
                        cart?.map((item, index)=> (
                            <li key={item._id+index} className="flex py-6">
                                <div className="h-full w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img alt={item.name+"-"+ index} src={item.images[0]} className="h-full w-full object-contain object-center" />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col text-title">
                                    <div>
                                        <div className="flex justify-between text-title font-medium text-gray-900">
                                            <h3 className='font-bold'>
                                                <Link to={`/products/${item._id}`}>{item.name}</Link>
                                            </h3>
                                            <p className="ml-4 font-bold">{`$${item.price}`}</p>
                                        </div>
                                        <p className="mt-1 text-base text-gray-500">{item.description}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-title">
                                        <p className="text-gray-500">Qty 1</p>
                                        <div className="flex">
                                            <button type="button" onClick={()=> removeProduct(item._id)} className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )) : <div className='h-1/3'>No hay productos en el carrito de compra</div> }
                    </div>
                </div>

                <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                        <p className="text-xl font-semibold text-gray-900">Resumen de compra</p>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-500">Precio total</dt>
                                <dd className="text-base font-medium text-gray-900">${Number(totalAmount).toFixed(2)}</dd>
                            </dl>
                            <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-500">Envio</dt>
                                <dd className="text-base font-medium text-gray-900">$0</dd>
                            </dl>
                        </div>
                            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                            <dt className="text-base font-bold text-gray-900">Total</dt>
                            <dd className="text-base font-bold text-gray-900">${Number(totalAmount).toFixed(2)}</dd>
                        </dl>
                    </div>
                    <div className='flex flex-col gap-4 md:flex-row md:justify-between'>
                        <Button disabled={(cart.length === 0) ? true : false} onClick={() => setOpenModal(true)} color={"blue"} className="flex w-full md:max-w-60 items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
                            Pedir por Whatsapp
                            <IoLogoWhatsapp className='ml-2 size-5'/>
                        </Button>
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-base font-normal text-gray-500"> or </span>
                            <Link to={"/discover"} title="" className="inline-flex items-center gap-2 text-base font-medium text-blue-700 underline hover:no-underline">
                            Continuar explorando
                            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                            </svg>
                            </Link>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="space-y-6">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Antes de continuar con tu pedido, necesitamos unos datos tuyos</h3>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="customerName" value="Escribe tu nombre y apellido" />
                        </div>
                        <TextInput
                            id="customerName"
                            placeholder="Allison Decker"
                            value={customerName}
                            onChange={(event) => setCustomerName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2 block">
                        <Label htmlFor="seller" value="¿Cómo te enteraste de nosotros? Elige una opción" />
                    </div>
                    <select defaultValue={customerProvider} onChange={(e)=> setCustomerProvider(e.target.value)} required id="seller" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="jorge">Jorge</option>
                        <option value="vanessa">Vanessa</option>
                        <option value="claudia">Claudia</option>
                        <option value="lidia">Lidia</option>
                        <option value="henry">Henry</option>
                        <option value="anuncio">Anuncio en Facebook/Instagram</option>
                        <option value="otro">Otra forma</option>
                    </select>
                    <div className="w-full">
                        <a disabled={(customerName === '' || customerProvider === '') ? true : false} target='blank' href={urlW} onClick={handleSubmit} className="flex w-full md:max-w-60 items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">Ordenar por Whatsapp</a>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </section>
  )
}

export default CartShopping