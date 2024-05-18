import { useState, useEffect } from 'react'
import Header from "./components/Header"
import Guitar from './components/Guitar'
import { db } from './data/db'
import { Toaster } from 'sonner';
import { toast } from 'sonner';


function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  
  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const MIN_ITEMS = 1
  const MAX_ITEMS = 5
  
  useEffect( () => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item){

    const itemExists = cart.findIndex( guitar => guitar.id === item.id) // retorna -1 si no existe y el indice correspondiente si existe

    if(itemExists >= 0) { //si existe en el carrito
      if(cart[itemExists].quantity >= MAX_ITEMS) return
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    }else{
      item.quantity = 1
      setCart([...cart, item])
    }

    toast.success('¡PRODUCTO AGREGADO!', {
      position: 'top-center',
      duration: 2000
    });
    
  }

  function removeFromCart(id) {
    setCart( prevCart => prevCart.filter( guitar => guitar.id !== id))
    toast('PRODUCTO ELIMINADO', {
      position: 'top-center',
      duration: 2000
    });
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity > MIN_ITEMS){
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function increaseQuantity(id){
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity < MAX_ITEMS){
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }
  
  function clearCart(e){
    setCart([])
  }
  

  return (
    <> 
      
    <Header 
      cart={cart}
      removeFromCart={removeFromCart}
      decreaseQuantity={decreaseQuantity}
      increaseQuantity={increaseQuantity}
      clearCart={clearCart}
    />  

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map( guitar => ( 
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    <Toaster />

    </>
  )
}

export default App
