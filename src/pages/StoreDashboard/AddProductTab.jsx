import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export const AddProductTab = ({ onAddProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    discount: '',
    stock: '',
    description: ''
  });

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setNewProduct({ ...newProduct, category: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['name', 'category', 'price', 'stock', 'description'];
    if (requiredFields.some(field => !newProduct[field])) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }
    onAddProduct({ id: Date.now(), ...newProduct, createdAt: new Date().toISOString() });
    setNewProduct({ name: '', category: '', price: '', discount: '', stock: '', description: '' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agregar Nuevo Producto</CardTitle>
        <p className="text-sm text-gray-600">Completa la información de tu producto.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del producto</label>
              <Input type="text" name="name" value={newProduct.name} onChange={handleInputChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <Select onValueChange={handleSelectChange} value={newProduct.category}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cafe">Café</SelectItem>
                  <SelectItem value="artesanias">Artesanías</SelectItem>
                  <SelectItem value="alimentos">Alimentos</SelectItem>
                  <SelectItem value="bebidas">Bebidas</SelectItem>
                  <SelectItem value="dulces">Dulces</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio (COP)</label>
              <Input type="number" name="price" value={newProduct.price} onChange={handleInputChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descuento (%)</label>
              <Input type="number" name="discount" value={newProduct.discount} onChange={handleInputChange} min="0" max="100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Existencias</label>
              <Input type="number" name="stock" value={newProduct.stock} onChange={handleInputChange} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
            <Textarea name="description" value={newProduct.description} onChange={handleInputChange} rows={4} required />
          </div>
          <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Agregar producto
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};