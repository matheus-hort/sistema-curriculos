"use client";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IMaskInput } from "react-imask";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FiPlus,
  FiTrash2,
  FiUser,
  FiBriefcase,
  FiBook,
  FiStar,
  FiUpload,
  FiArrowLeft,
} from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";
import { curriculos as dadosIniciais } from "@/lib/data";

const schema = yup.object({
  nome: yup.string().min(3, "Nome deve ter pelo menos 3 caracteres").required("Nome é obrigatório"),
  cargo: yup.string().min(3, "Cargo deve ter pelo menos 3 caracteres").required("Cargo é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  telefone: yup.string().min(14, "Telefone inválido").required("Telefone é obrigatório"),
  cpf: yup.string().min(14, "CPF inválido").required("CPF é obrigatório"),
  resumo: yup.string().min(20, "Resumo deve ter pelo menos 20 caracteres").required("Resumo é obrigatório"),
  experiencias: yup.array().of(
    yup.object({
      empresa: yup.string().required("Empresa é obrigatória"),
      cargo: yup.string().required("Cargo é obrigatório"),
      inicio: yup.string().required("Data de início é obrigatória"),
      fim: yup.string().required("Data de término é obrigatória"),
      descricao: yup.string().min(10, "Descrição muito curta").required("Descrição é obrigatória"),
    })
  ).min(1, "Adicione pelo menos uma experiência"),
  formacoes: yup.array().of(
    yup.object({
      instituicao: yup.string().required("Instituição é obrigatória"),
      curso: yup.string().required("Curso é obrigatório"),
      inicio: yup.string().required("Data de início é obrigatória"),
      fim: yup.string().required("Data de término é obrigatória"),
    })
  ).min(1, "Adicione pelo menos uma formação"),
  habilidades: yup.string().required("Informe pelo menos uma habilidade"),
});

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-red-500 text-xs mt-1">{message}</p>;
}

export default function NovoCurriculo() {
  const router = useRouter();
  const [fotoNome, setFotoNome] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      experiencias: [{ empresa: "", cargo: "", inicio: "", fim: "", descricao: "" }],
      formacoes: [{ instituicao: "", curso: "", inicio: "", fim: "" }],
    },
  });

  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({ control, name: "experiencias" });

  const {
    fields: formFields,
    append: appendForm,
    remove: removeForm,
  } = useFieldArray({ control, name: "formacoes" });

  function onSubmit(data: any) {
    const salvos = localStorage.getItem("curriculos");
    const lista = salvos ? JSON.parse(salvos) : dadosIniciais;

    const novo = {
      id: Date.now().toString(),
      nome: data.nome,
      cargo: data.cargo,
      email: data.email,
      telefone: data.telefone,
      cpf: data.cpf,
      foto: "/fotos/default.jpg",
      resumo: data.resumo,
      experiencias: data.experiencias,
      formacoes: data.formacoes,
      habilidades: data.habilidades.split(",").map((h: string) => h.trim()).filter(Boolean),
    };

    localStorage.setItem("curriculos", JSON.stringify([...lista, novo]));
    toast.success("Currículo cadastrado!", { description: "O candidato foi salvo com sucesso." });
    router.push("/sistema/paginas/curriculos");
  }

  function onError(erros: any) {
    const primeiroErro = Object.values(erros)[0] as any;
    const mensagem = primeiroErro?.message || "Corrija os erros antes de enviar.";
    toast.error("Erro de validação", { description: mensagem });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link
        href="/sistema/paginas/curriculos"
        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 text-sm transition-colors"
      >
        <FiArrowLeft /> Voltar para currículos
      </Link>

      <h1 className="text-3xl font-bold text-slate-800 mb-2">Novo Currículo</h1>
      <p className="text-slate-500 mb-8">Preencha todos os campos para cadastrar um novo candidato.</p>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-6">

        {/* Dados pessoais */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-700 text-base flex items-center gap-2">
              <FiUser className="text-blue-600" /> Dados Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Foto fake */}
            <div className="sm:col-span-2">
              <Label className="text-slate-700">Foto do Candidato</Label>
              <label className="mt-2 flex items-center gap-3 border-2 border-dashed border-slate-200 rounded-lg p-4 cursor-pointer hover:border-blue-400 transition-colors">
                <FiUpload className="text-blue-500" size={20} />
                <span className="text-sm text-slate-500">
                  {fotoNome || "Clique para selecionar uma imagem (apenas simulação)"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFotoNome(e.target.files?.[0]?.name || "")}
                />
              </label>
            </div>

            <div>
              <Label className="text-slate-700">Nome completo *</Label>
              <Input className="mt-1 border-slate-200" {...register("nome")} />
              <FieldError message={errors.nome?.message} />
            </div>

            <div>
              <Label className="text-slate-700">Cargo desejado *</Label>
              <Input className="mt-1 border-slate-200" {...register("cargo")} />
              <FieldError message={errors.cargo?.message} />
            </div>

            <div>
              <Label className="text-slate-700">E-mail *</Label>
              <Input type="email" className="mt-1 border-slate-200" {...register("email")} />
              <FieldError message={errors.email?.message} />
            </div>

            <div>
              <Label className="text-slate-700">Telefone *</Label>
              <Controller
                name="telefone"
                control={control}
                render={({ field }) => (
                  <IMaskInput
                    mask="(00) 00000-0000"
                    {...field}
                    className="mt-1 flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="(00) 00000-0000"
                  />
                )}
              />
              <FieldError message={errors.telefone?.message} />
            </div>

            <div>
              <Label className="text-slate-700">CPF *</Label>
              <Controller
                name="cpf"
                control={control}
                render={({ field }) => (
                  <IMaskInput
                    mask="000.000.000-00"
                    {...field}
                    className="mt-1 flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="000.000.000-00"
                  />
                )}
              />
              <FieldError message={errors.cpf?.message} />
            </div>

            <div className="sm:col-span-2">
              <Label className="text-slate-700">Resumo profissional *</Label>
              <textarea
                rows={4}
                className="mt-1 flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Descreva brevemente seu perfil e objetivos profissionais..."
                {...register("resumo")}
              />
              <FieldError message={errors.resumo?.message} />
            </div>
          </CardContent>
        </Card>

        {/* Experiências */}
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-slate-700 text-base flex items-center gap-2">
              <FiBriefcase className="text-blue-600" /> Experiências Profissionais
            </CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
              onClick={() => appendExp({ empresa: "", cargo: "", inicio: "", fim: "", descricao: "" })}
            >
              <FiPlus className="mr-1" size={14} /> Adicionar
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {expFields.map((field, i) => (
              <div key={field.id}>
                {i > 0 && <Separator className="mb-6" />}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-700">Empresa *</Label>
                    <Input className="mt-1 border-slate-200" {...register(`experiencias.${i}.empresa`)} />
                    <FieldError message={errors.experiencias?.[i]?.empresa?.message} />
                  </div>
                  <div>
                    <Label className="text-slate-700">Cargo *</Label>
                    <Input className="mt-1 border-slate-200" {...register(`experiencias.${i}.cargo`)} />
                    <FieldError message={errors.experiencias?.[i]?.cargo?.message} />
                  </div>
                  <div>
                    <Label className="text-slate-700">Início *</Label>
                    <Controller
                      name={`experiencias.${i}.inicio`}
                      control={control}
                      render={({ field }) => (
                        <IMaskInput
                          mask="00/0000"
                          {...field}
                          placeholder="MM/AAAA"
                          className="mt-1 flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    />
                    <FieldError message={errors.experiencias?.[i]?.inicio?.message} />
                  </div>
                  <div>
                    <Label className="text-slate-700">Término *</Label>
                    <Controller
                      name={`experiencias.${i}.fim`}
                      control={control}
                      render={({ field }) => (
                        <IMaskInput
                          mask="00/0000"
                          {...field}
                          placeholder="MM/AAAA"
                          className="mt-1 flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    />
                    <FieldError message={errors.experiencias?.[i]?.fim?.message} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-slate-700">Descrição *</Label>
                    <textarea
                      rows={3}
                      className="mt-1 flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      {...register(`experiencias.${i}.descricao`)}
                    />
                    <FieldError message={errors.experiencias?.[i]?.descricao?.message} />
                  </div>
                </div>
                {expFields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-3 border-red-200 text-red-500 hover:bg-red-50"
                    onClick={() => removeExp(i)}
                  >
                    <FiTrash2 className="mr-1" size={14} /> Remover
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Formações */}
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-slate-700 text-base flex items-center gap-2">
              <FiBook className="text-blue-600" /> Formações Acadêmicas
            </CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
              onClick={() => appendForm({ instituicao: "", curso: "", inicio: "", fim: "" })}
            >
              <FiPlus className="mr-1" size={14} /> Adicionar
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {formFields.map((field, i) => (
              <div key={field.id}>
                {i > 0 && <Separator className="mb-6" />}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-700">Instituição *</Label>
                    <Input className="mt-1 border-slate-200" {...register(`formacoes.${i}.instituicao`)} />
                    <FieldError message={errors.formacoes?.[i]?.instituicao?.message} />
                  </div>
                  <div>
                    <Label className="text-slate-700">Curso *</Label>
                    <Input className="mt-1 border-slate-200" {...register(`formacoes.${i}.curso`)} />
                    <FieldError message={errors.formacoes?.[i]?.curso?.message} />
                  </div>
                  <div>
                    <Label className="text-slate-700">Início *</Label>
                    <Controller
                      name={`formacoes.${i}.inicio`}
                      control={control}
                      render={({ field }) => (
                        <IMaskInput
                          mask="00/0000"
                          {...field}
                          placeholder="MM/AAAA"
                          className="mt-1 flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    />
                    <FieldError message={errors.formacoes?.[i]?.inicio?.message} />
                  </div>
                  <div>
                    <Label className="text-slate-700">Término *</Label>
                    <Controller
                      name={`formacoes.${i}.fim`}
                      control={control}
                      render={({ field }) => (
                        <IMaskInput
                          mask="00/0000"
                          {...field}
                          placeholder="MM/AAAA"
                          className="mt-1 flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    />
                    <FieldError message={errors.formacoes?.[i]?.fim?.message} />
                  </div>
                </div>
                {formFields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-3 border-red-200 text-red-500 hover:bg-red-50"
                    onClick={() => removeForm(i)}
                  >
                    <FiTrash2 className="mr-1" size={14} /> Remover
                  </Button>
                )}
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
            <Label className="text-slate-700">
              Habilidades * <span className="text-slate-400 font-normal">(separe por vírgula)</span>
            </Label>
            <Input
              className="mt-1 border-slate-200"
              placeholder="Ex: React, Node.js, Figma, SQL"
              {...register("habilidades")}
            />
            <FieldError message={errors.habilidades?.message} />
          </CardContent>
        </Card>

        {/* Botão enviar */}
        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {isSubmitting ? "Salvando..." : "Cadastrar Currículo"}
        </Button>
      </form>
    </div>
  );
}