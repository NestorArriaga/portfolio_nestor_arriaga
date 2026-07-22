import Link from 'next/link';
import Image from 'next/image';
import Reveal from '../home/motion/Reveal';

interface AguascalientesFamilyClosingProps {
  photoSrc: string;
}

export default function AguascalientesFamilyClosing({ photoSrc }: AguascalientesFamilyClosingProps) {
  const projects = [
    { id: "09", title: "VOCACIONES PRODUCTIVAS", desc: "Agrupación municipal con orientaciones hacia conservación y agricultura.", link: "/projects/vocaciones-productivas-aguascalientes", color: "#e2b85a" },
    { id: "10", title: "APTITUD PARA LA CONSERVACIÓN", desc: "Evaluación ponderada de cinco atributos territoriales.", link: "/projects/aptitud-conservacion-aguascalientes", color: "#4caf50" },
    { id: "11", title: "APTITUD AGRÍCOLA", desc: "Evaluación ponderada de seis atributos territoriales.", link: "/projects/aptitud-agricola-aguascalientes", color: "#ff9800" },
    { id: "12", title: "DEGRADACIÓN DEL SUELO", desc: "Lectura cartográfica vinculada con una propuesta de manejo ganadero en Calvillo.", link: "/projects/degradacion-suelo-calvillo", color: "#c18a6d" },
    { id: "13", title: "SUBCUENCAS Y RÍOS", desc: "Representación hidrológica vinculada con la misma propuesta territorial.", link: "/projects/subcuencas-rios-calvillo", color: "#4a9eb4" }
  ];

  return (
    <section className="w-full bg-[#050505] py-32 border-t border-white/20 overflow-hidden relative">
      
      {/* IMAGEN DE FONDO (CALVILLO) */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-10 z-0 mix-blend-lighten pointer-events-none">
        <Image src={photoSrc} alt="" fill className="object-cover" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <Reveal direction="up" className="mb-16">
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-display-md text-white">AGUASCALIENTES</h2>
            <div className="text-mono text-[10px] text-white/50 tracking-widest uppercase flex flex-wrap gap-4 mt-2">
              <span>VOCACIÓN</span>
              <span className="text-white/20">•</span>
              <span>APTITUD</span>
              <span className="text-white/20">•</span>
              <span>SUELO</span>
              <span className="text-white/20">•</span>
              <span>AGUA</span>
              <span className="text-white/20">•</span>
              <span>MANEJO</span>
            </div>
          </div>

          <p className="text-body-lg text-white/80 leading-relaxed font-light max-w-2xl mb-8">
            Los cinco proyectos recorren el territorio desde agrupaciones productivas y análisis de aptitud hasta una lectura localizada del suelo y del agua en Calvillo.
          </p>
          <p className="text-body text-white/50 leading-relaxed font-light max-w-2xl">
            La secuencia muestra diferentes formas de utilizar la cartografía para organizar preguntas de planeación rural, conservación, agricultura y manejo territorial.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {projects.map((p, idx) => (
            <Reveal key={p.id} delay={idx * 0.1} direction="up" distance={24} className="h-full">
              <Link 
                href={p.link}
                scroll={false}
                className="group block h-full border border-white/10 hover:border-white/30 rounded-[var(--radius-panel)] p-6 bg-white/5 transition-colors"
                style={{ '--hover-color': p.color } as any}
              >
                <div className="text-mono text-[10px] text-white/40 group-hover:text-[var(--hover-color)] transition-colors mb-4">{p.id}</div>
                <h3 className="text-label text-white/90 mb-4 h-10">{p.title}</h3>
                <p className="text-[12px] text-white/50 font-light leading-relaxed">{p.desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
