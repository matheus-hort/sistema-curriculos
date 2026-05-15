"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiSearch, FiPlus, FiUser, FiArrowRight } from "react-icons/fi";
import { curriculos as dadosIniciais } from "@/lib/data";

export default function CurriculosPage() {
  const [busca, setBusca] = useState("");
  const [curriculos, setCurriculos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);

  useEffect(() => {
    const salvos = localStorage.getItem("curriculos");
    const lista = salvos ? JSON.parse(salvos) : dadosIniciais;
    setCurriculos(lista);
    setFiltrados(lista);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const termo = busca.toLowerCase();
      const resultado = curriculos.filter(
        (c: any) =>
          c.nome.toLowerCase().includes(termo) ||
          c.cargo.toLowerCase().includes(termo)
      );
      setFiltrados(resultado);
    }, 300);
    return () => clearTimeout(timeout);
  }, [busca, curriculos]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Topo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Currículos</h1>
          <p className="text-slate-500 mt-1">
            {filtrados.length} candidato{filtrados.length !== 1 ? "s" : ""} encontrado{filtrados.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/sistema/paginas/curriculos/novo">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <FiPlus className="mr-2" />
            Novo Currículo
          </Button>
        </Link>
      </div>

      {/* Busca */}
      <div className="relative mb-8">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Buscar por nome ou cargo..."
          className="pl-10 bg-white border-slate-200"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* Lista */}
      {filtrados.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <FiUser size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">Nenhum currículo encontrado.</p>
          <Link href="/sistema/paginas/curriculos/novo">
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
              Cadastrar currículo
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map((c: any) => (
            <Card key={c.id} className="hover:shadow-md transition-shadow border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={c.foto}
                      alt={c.nome}
                      className="w-full h-full object-cover"
                      onError={(e: any) => { e.target.src = "/fotos/default.jpg"; }}
                    />
                  </div>
                 <div>
                    <CardTitle className="text-slate-800 text-base leading-tight">
                      {c.nome}
                    </CardTitle>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {c.cargo}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 text-sm line-clamp-3 mb-4">
                  {c.resumo}
                </p>
                <Link href={`/sistema/paginas/curriculos/${c.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    Ver detalhes
                    <FiArrowRight className="ml-2" size={14} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}