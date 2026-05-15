import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FiUsers,
  FiSearch,
  FiCheckCircle,
  FiArrowRight,
  FiFileText,
  FiStar,
  FiShield,
  FiZap,
} from "react-icons/fi";

const beneficios = [
  {
    icon: <FiUsers size={28} className="text-blue-600" />,
    titulo: "Gestão Centralizada",
    descricao: "Centralize todos os currículos em um único lugar, com acesso rápido e organizado.",
  },
  {
    icon: <FiSearch size={28} className="text-blue-600" />,
    titulo: "Busca em Tempo Real",
    descricao: "Encontre candidatos instantaneamente filtrando por nome ou cargo desejado.",
  },
  {
    icon: <FiCheckCircle size={28} className="text-blue-600" />,
    titulo: "Dados Validados",
    descricao: "Formulários com validação rigorosa garantem a integridade das informações cadastradas.",
  },
  {
    icon: <FiZap size={28} className="text-blue-600" />,
    titulo: "Rápido e Responsivo",
    descricao: "Interface otimizada para desktop, tablet e dispositivos móveis.",
  },
  {
    icon: <FiShield size={28} className="text-blue-600" />,
    titulo: "Seguro e Confiável",
    descricao: "Seus dados organizados com segurança e disponíveis sempre que precisar.",
  },
  {
    icon: <FiStar size={28} className="text-blue-600" />,
    titulo: "UX Moderno",
    descricao: "Design limpo e intuitivo desenvolvido para uma experiência agradável ao usuário.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-blue-500 text-white mb-4 px-4 py-1 text-sm">
            🚀 Sistema de Gestão de Currículos
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Gerencie talentos com <br />
            <span className="text-blue-200">simplicidade e eficiência</span>
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Uma plataforma moderna para cadastrar, visualizar e gerenciar currículos
            de candidatos de forma rápida e organizada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sistema/paginas/curriculos/novo">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold w-full sm:w-auto">
                <FiFileText className="mr-2" />
                Cadastrar Currículo
              </Button>
            </Link>
            <Link href="/sistema/paginas/curriculos">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 w-full sm:w-auto">
                Ver Currículos
                <FiArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">
              Por que usar o GestãoCurrículo?
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Desenvolvido com as melhores tecnologias para oferecer uma experiência
              completa na gestão de talentos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficios.map((b, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow border-slate-200">
                <CardHeader>
                  <div className="mb-2">{b.icon}</div>
                  <CardTitle className="text-slate-800 text-lg">{b.titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500 text-sm">{b.descricao}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Pronto para começar?
          </h2>
          <p className="text-slate-500 mb-8">
            Cadastre o primeiro currículo agora mesmo e veja como é simples gerenciar
            talentos com nossa plataforma.
          </p>
          <Link href="/sistema/paginas/curriculos/novo">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              <FiFileText className="mr-2" />
              Cadastrar agora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}