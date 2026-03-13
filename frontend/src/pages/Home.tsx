import { useState } from 'react';
import { useMedications } from '@/hooks/useMedication';
import { useAuthentication } from '@/hooks/useAuthentication';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '../components/ui/badge';
import { Search, Edit, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  const { medications } = useMedications();
  const { isAuthenticated } = useAuthentication();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMedications = medications.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.laboratory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-6 sm:py-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Consulta de Disponibilidade de Medicamentos
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Encontre rapidamente a disponibilidade de medicamentos em nossa farmácia
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por nome do medicamento ou laboratório..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 text-sm text-gray-600">
        {filteredMedications.length} medicamento(s) encontrado(s)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredMedications.map((medication) => (
          <Card key={medication.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">{medication.name}</CardTitle>
                  <CardDescription>{medication.laboratory}</CardDescription>
                </div>
                {medication.available ? (
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                    <CheckCircle className="size-3 mr-1" />
                    Disponível
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-red-100 text-red-700">
                    <XCircle className="size-3 mr-1" />
                    Indisponível
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dosagem:</span>
                  <span className="font-medium">{medication.dosage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantidade:</span>
                  <span className="font-medium">{medication.quantity} unidades</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Preço:</span>
                  <span className="font-medium text-emerald-600">
                    R$ {medication.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-gray-600 text-xs mt-3 pt-3 border-t">
                  {medication.description}
                </p>
                
                {isAuthenticated && (
                  <Link to={`/editar/${medication.id}`} className="block mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="size-4 mr-2" />
                      Editar
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMedications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Nenhum medicamento encontrado com o termo "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
}
