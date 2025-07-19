import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

export const ProfileTab = ({ onFeatureClick }) => (
  <Card>
    <CardHeader>
      <CardTitle>Mi perfil</CardTitle>
      <p className="text-sm text-gray-600">Gestiona tu información personal y de cuenta.</p>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
            <Input type="text" defaultValue="Janier Mosquera" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
            <Input type="email" defaultValue="jamosquera051@gmail.com" readOnly />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nueva Contraseña</label>
          <Input type="password" placeholder="Dejar en blanco para no cambiar" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar nueva contraseña</label>
          <Input type="password" placeholder="Dejar en blanco para no cambiar" />
        </div>
        <Button onClick={onFeatureClick} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <User className="mr-2 h-4 w-4" />
          Guardar perfil
        </Button>
      </div>
    </CardContent>
  </Card>
);