"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { curriculos as dadosIniciais } from "@/lib/data";
import { toast } from "sonner";
import {
  FiArrowLeft,
  FiTrash2,
  FiUser,
  FiBriefcase,
  FiBook,
  FiStar,
  FiMail,
  FiPhone,
  FiCreditCard,
} from "react-icons/fi";

export default function DetalheCurriculo() {
  const { id } = useParams();
  const router = useRouter();
  const [curriculo, setCurriculo] = useState<any>(null);

  useEffect(() => {
    const salvos = localStorage.getItem("curriculos");
    const lista = salvos ? JSON.parse(salvos) : dadosIniciais;
    const encontrado = lista.find((c: any) => c.id === id);
    setCurriculo(encontrado || null);
  }, [id]);

  function handleExcluir() {
    const salvos = localStorage.getItem("curriculos");
    const lista = salvos ? JSON.parse(salvos) : dadosIniciais;
    const novaLista = lista.filter((c: any) => c.id !== id);
    localStorage.setItem("curriculos", JSON.stringify(novaLista));
    toast.success("Currículo excluído com sucesso!");
    router.push("/sistema/paginas/curriculos");
  }

  if (!curriculo) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-400">
        <FiUser size={48} className="mx-auto mb-4 opacity-30" />
        <p className="text-lg">Currículo não encontrado.</p>
        <Link href="/sistema/paginas/curriculos">
          <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
            Voltar para a lista
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Voltar */}
      <Link
        href="/sistema/paginas/curriculos"
        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 text-sm transition-colors"
      >
        <FiArrowLeft /> Voltar para currículos
      </Link>

      {/* Cabeçalho do candidato */}
      <Card className="mb-6 border-slate-200">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-3xl flex-shrink-0">
              {curriculo.nome.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-800">{curriculo.nome}</h1>
              <Badge className="bg-blue-100 text-blue-700 mt-1">{curriculo.cargo}</Badge>
              <p className="text-slate-500 mt-3 text-sm">{curriculo.resumo}</p>
            </div>
            <Button
              variant="outline"
              className="border-red-200 text-red-500 hover:bg-red-50 self-start sm:self-center"
              onClick={handleExcluir}
            >
              <FiTrash2 className="mr-2" size={14} />
              Excluir
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Informações de contato */}
      <Card className="mb-6 border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-700 text-base flex items-center gap-2">
            <FiUser className="text-blue-600" /> Informações de Contato
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <FiMail className="text-blue-500 flex-shrink-0" />
            {curriculo.email}
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <FiPhone className="text-blue-500 flex-shrink-0" />
            {curriculo.telefone}
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <FiCreditCard className="text-blue-500 flex-shrink-0" />
            {curriculo.cpf}
          </div>
        </CardContent>
      </Card>

      {/* Experiências */}
      <Card className="mb-6 border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-700 text-base flex items-center gap-2">
            <FiBriefcase className="text-blue-600" /> Experiências Profissionais
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {curriculo.experiencias.map((exp: any, i: number) => (
            <div key={i}>
              {i > 0 && <Separator className="mb-4" />}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                <div>
                  <p className="font-semibold text-slate-800">{exp.cargo}</p>
                  <p className="text-slate-500 text-sm">{exp.empresa}</p>
                  <p className="text-slate-400 text-xs mt-1">{exp.descricao}</p>
                </div>
                <Badge variant="secondary" className="self-start text-xs whitespace-nowrap">
                  {exp.inicio} – {exp.fim}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Formações */}
      <Card className="mb-6 border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-700 text-base flex items-center gap-2">
            <FiBook className="text-blue-600" /> Formações Acadêmicas
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {curriculo.formacoes.map((form: any, i: number) => (
            <div key={i}>
              {i > 0 && <Separator className="mb-4" />}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                <div>
                  <p className="font-semibold text-slate-800">{form.curso}</p>
                  <p className="text-slate-500 text-sm">{form.instituicao}</p>
                </div>
                <Badge variant="secondary" className="self-start text-xs whitespace-nowrap">
                  {form.inicio} – {form.fim}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Habilidades */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-700 text-base flex items-center gap-2">
            <FiStar className="text-blue-600" /> Habilidades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {curriculo.habilidades.map((h: string, i: number) => (
              <Badge key={i} className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                {h}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}