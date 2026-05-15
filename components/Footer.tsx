import { FiFileText, FiGithub, FiLinkedin } from "react-icons/fi";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white font-semibold">
          <FiFileText size={20} />
          <span>GestãoCurrículo</span>
        </div>
        <p className="text-sm text-center">
          © {new Date().getFullYear()} GestãoCurrículo. Todos os direitos reservados.
        </p>
        <div className="flex items-center gap-4">
          <Link href="https://github.com" target="_blank" className="hover:text-white transition-colors">
            <FiGithub size={20} />
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="hover:text-white transition-colors">
            <FiLinkedin size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}