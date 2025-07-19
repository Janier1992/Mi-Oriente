import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { productsData } from '@/data/products';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "¡Agregado al carrito!",
      description: `${product.name} ha sido añadido a tu carrito.`,
    });
  };

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group border">
      <div className="relative">
        <img 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          src="https://images.unsplash.com/photo-1559223669-e0065fa7f142" />
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {product.discount}% OFF
          </div>
        )}
      </div>
      <CardContent className="p-4 bg-white">
        <p className="text-xs text-gray-500 mb-1">{product.store}</p>
        <h3 className="text-md font-semibold text-gray-800 truncate">{product.name}</h3>
        <p className="text-lg font-bold text-green-600 mt-2">
          ${(product.price * (1 - product.discount / 100)).toLocaleString()}
          {product.discount > 0 && (
            <span className="text-sm text-gray-500 line-through ml-2">
              ${product.price.toLocaleString()}
            </span>
          )}
        </p>
        <Button onClick={handleAddToCart} className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Agregar
        </Button>
      </CardContent>
    </Card>
  );
};

const CartSidebar = ({ isOpen, onClose }) => {
    const { items, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemCount } = useCartStore();
  
    const handleCheckout = () => {
        toast({
            title: "Pedido realizado (simulación)",
            description: "Tu pedido ha sido enviado a las tiendas. ¡Gracias por tu compra!",
        });
        clearCart();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-40"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl z-50 flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-2xl font-bold text-gray-800">Tu Carrito ({getCartItemCount()})</h2>
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <X className="h-6 w-6" />
                            </Button>
                        </div>
                        
                        {items.length === 0 ? (
                            <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                                <ShoppingBag className="h-24 w-24 text-gray-300 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-700">Tu carrito está vacío</h3>
                                <p className="text-gray-500 mt-2">¡Añade productos para empezar a comprar!</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                                    {items.map(item => (
                                        <div key={item.id} className="flex items-start space-x-4">
                                            <div className="w-20 h-20 rounded-lg overflow-hidden border">
                                              <img  alt={item.name} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1571302171879-0965db383dc4" />
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                                                <p className="text-sm text-gray-500">${item.price.toLocaleString()}</p>
                                                <div className="flex items-center mt-2">
                                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="w-10 text-center font-semibold">{item.quantity}</span>
                                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-800">${(item.price * item.quantity).toLocaleString()}</p>
                                                <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 mt-2" onClick={() => removeFromCart(item.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 border-t space-y-4 bg-gray-50">
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Subtotal</span>
                                        <span>${getCartTotal().toLocaleString()}</span>
                                    </div>
                                    <Button onClick={handleCheckout} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-lg">
                                        Proceder al Pago
                                    </Button>
                                    <Button variant="outline" onClick={clearCart} className="w-full">
                                        Vaciar Carrito
                                    </Button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const ProductsPage = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartItemCount = useCartStore((state) => state.getCartItemCount());

  return (
    <>
      <Helmet>
        <title>Productos - Domicilios MiOriente</title>
        <meta name="description" content="Explora y compra los mejores productos del Oriente Antioqueño. Café, artesanías, dulces y más, con entrega a domicilio." />
      </Helmet>
      
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-white shadow-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-2">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-gray-800">Domicilios - MiOriente</span>
              </Link>
              <Button onClick={() => setIsCartOpen(true)} className="relative bg-primary text-primary-foreground hover:bg-primary/90">
                <ShoppingBag className="mr-2 h-5 w-5" />
                <span>Ver Carrito</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Nuestros Productos</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Descubre los sabores y la tradición del Oriente Antioqueño en un solo lugar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productsData.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default ProductsPage;