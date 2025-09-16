import { useState, useEffect } from 'react';
import './App.css';

interface Periferico {
  id: string;
  nome: string;
}

interface Computador {
  id: string;
  nome: string;
  cor: string;
  dataFabricacao: number;
  perifericos: Periferico[];
}

const API_BASE = 'http://localhost:3000';

function App() {
  const [computadores, setComputadores] = useState<Computador[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    nome: '',
    cor: '',
    dataFabricacao: new Date().getFullYear(),
    perifericos: [{ nome: '' }]
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    loadComputadores();
  }, []);

  const loadComputadores = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/computador`);
      const data = await response.json();
      setComputadores(data);
    } catch (error) {
      setMessage('Erro ao carregar computadores');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = editingId ? `${API_BASE}/computador/${editingId}` : `${API_BASE}/computador`;
      const method = editingId ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage(editingId ? 'Computador atualizado!' : 'Computador criado!');
        setFormData({ nome: '', cor: '', dataFabricacao: new Date().getFullYear(), perifericos: [{ nome: '' }] });
        setEditingId(null);
        loadComputadores();
      } else {
        setMessage('Erro ao salvar computador');
      }
    } catch (error) {
      setMessage('Erro ao salvar computador');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (computador: Computador) => {
    setFormData({
      nome: computador.nome,
      cor: computador.cor,
      dataFabricacao: computador.dataFabricacao,
      perifericos: computador.perifericos.length > 0 ? computador.perifericos : [{ nome: '' }]
    });
    setEditingId(computador.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este computador?')) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/computador/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setMessage('Computador excluído!');
        loadComputadores();
      } else {
        setMessage('Erro ao excluir computador');
      }
    } catch (error) {
      setMessage('Erro ao excluir computador');
    } finally {
      setLoading(false);
    }
  };

  const addPeriferico = () => {
    setFormData({
      ...formData,
      perifericos: [...formData.perifericos, { nome: '' }]
    });
  };

  const removePeriferico = (index: number) => {
    if (formData.perifericos.length > 1) {
      setFormData({
        ...formData,
        perifericos: formData.perifericos.filter((_, i) => i !== index)
      });
    }
  };

  const updatePeriferico = (index: number, nome: string) => {
    const newPerifericos = [...formData.perifericos];
    newPerifericos[index] = { ...newPerifericos[index], nome };
    setFormData({ ...formData, perifericos: newPerifericos });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Gerenciar Computadores</h1>
      
      {message && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {message}
          <button onClick={() => setMessage('')} className="float-right">×</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Editar Computador' : 'Novo Computador'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome *</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Cor *</label>
              <input
                type="text"
                value={formData.cor}
                onChange={(e) => setFormData({...formData, cor: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ano de Fabricação *</label>
              <input
                type="number"
                value={formData.dataFabricacao}
                onChange={(e) => setFormData({...formData, dataFabricacao: parseInt(e.target.value)})}
                min="1980"
                max={new Date().getFullYear()}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Periféricos *</label>
              {formData.perifericos.map((periferico, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={periferico.nome}
                    onChange={(e) => updatePeriferico(index, e.target.value)}
                    placeholder="Nome do periférico"
                    className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  {formData.perifericos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePeriferico(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addPeriferico}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
              >
                + Adicionar Periférico
              </button>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? 'Salvando...' : (editingId ? 'Atualizar' : 'Criar')}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ nome: '', cor: '', dataFabricacao: new Date().getFullYear(), perifericos: [{ nome: '' }] });
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Lista de Computadores</h2>
          
          {loading ? (
            <div className="text-center py-4">Carregando...</div>
          ) : computadores.length === 0 ? (
            <div className="text-center py-4 text-gray-500">Nenhum computador cadastrado</div>
          ) : (
            <div className="space-y-3">
              {computadores.map((computador) => (
                <div key={computador.id} className="border border-gray-200 rounded p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{computador.nome}</h3>
                      <p className="text-gray-600">Cor: {computador.cor}</p>
                      <p className="text-gray-600">Ano: {computador.dataFabricacao}</p>
                      <p className="text-sm text-gray-500">
                        Periféricos: {computador.perifericos.map(p => p.nome).join(', ')}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(computador)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(computador.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;