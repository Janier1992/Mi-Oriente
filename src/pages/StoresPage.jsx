import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Store, Star } from 'lucide-react';

const storesData = [
  {
    id: 1,
    name: "Café del Alma",
    category: "Cafetería",
    rating: 4.8,
    reviews: 120,
    image: "a-cup-of-coffee-on-a-table",
    description: "El mejor café de especialidad de la región, con granos seleccionados."
  },
  {
    id: 2,
    name: "Artesanías de mi Pueblo",
    category: "Artesanías",
    rating: 4.9,
    reviews: 250,
    image: "colorful-handmade-crafts-on-display",
    description: "Auténticas artesanías que cuentan la historia de nuestra tierra."
  },
  {
    id: 3,
    name: "Dulces de la Abuela",
    category: "Repostería",
    rating: 4.7,
    reviews: 88,
    image: "a-variety-of-sweets-and-pastries",
    description: "El sabor tradicional de los dulces caseros, hechos con amor."
  },
  {
    id: 4,
    name: "Embutidos El Paisa",
    category: "Alimentos",
    rating: 4.6,
    reviews: 95,
    image: "a-selection-of-cured-meats-and-sausages",
    description: "Chorizos, morcillas y más, con la receta original de la familia."
  },
];

const StoreCard = ({ store }) => (
  <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group border">
    <div className="relative">
      <img 
        alt={store.name}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
       src="https://images.unsplash.com/photo-1631367771698-606007aecd52" />
    </div>
    <CardContent className="p-4 bg-white">
      <h3 className="text-lg font-bold text-gray-800">{store.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{store.category}</p>
      <div className="flex items-center mb-4">
        <Star className="h-5 w-5 text-yellow-400 fill-current" />
        <span className="ml-1 font-semibold text-gray-700">{store.rating}</span>
        <span className="ml-2 text-sm text-gray-500">({store.reviews} reseñas)</span>
      </div>
      <p className="text-sm text-gray-600 mb-4 h-10">{store.description}</p>
      <Link to="/productos">
        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Store className="mr-2 h-4 w-4" />
          Visitar Tienda
        </Button>
      </Link>
    </CardContent>
  </Card>
);

const StoresPage = () => {
  return (
    <>
      <Helmet>
        <title>Tiendas - Domicilios MiOriente</title>
        <meta name="description" content="Descubre las mejores tiendas locales del Oriente Antioqueño. Apoya el comercio local." />
      </Helmet>
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-white shadow-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-2">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-gray-800">Domicilios - MiOriente</span>
              </Link>
              <Link to="/productos">
                <Button variant="outline">Ver Productos</Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Nuestras Tiendas</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Apoya el comercio local y descubre productos únicos de nuestra región.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {storesData.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default StoresPage;