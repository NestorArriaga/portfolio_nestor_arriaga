'use client';

import { useEffect, useRef, useState } from 'react';

import { useReveal } from '@/lib/motion';
import { TextureOverlay } from '@/components/atlas/TextureOverlay';
import styles from './ContactAct.module.css';

/**
 * Acto 6 — cierre.
 *
 * Negro profundo con un golpe amarillo. Las quince unidades se reúnen aquí
 * formando un arco alrededor del correo: las dibuja `UnitField`, que las trae
 * desde el riel; este componente solo deja el hueco libre en el centro.
 *
 * Sin formulario, sin párrafo de despedida y sin frase genérica. Nombre,
 * perfil, universidad, correo y año.
 *
 * "Copiar correo" confirma en el propio botón y lo anuncia con una región
 * `aria-live`. No hay toast: un aviso flotante sobre un cierre a pantalla
 * completa tapa justo lo que se acaba de completar.
 */

type Props = {
  name: string;
  role: string;
  institution: string;
  year: string;
  email: string;
  subject: string;
};

export function ContactAct({ name, role, institution, year, email, subject }: Props) {
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0.3 });
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      // Sin permiso de portapapeles el correo sigue accesible: está escrito
      // como texto y el enlace mailto funciona igual.
      setCopied(false);
    }
  };

  return (
    <section
      ref={ref}
      className={styles.act}
      id="contacto"
      data-revealed={revealed || undefined}
      aria-labelledby="contacto-titulo"
    >
      <div className={styles.core}>
        <p className={styles.kicker}>Contacto</p>
        <h2 id="contacto-titulo" className={styles.name}>{name}</h2>

        <a className={styles.mail} href={`mailto:${email}?subject=${encodeURIComponent(subject)}`}>
          {email}
        </a>

        <div className={styles.actions}>
          <a
            className={styles.button}
            href={`mailto:${email}?subject=${encodeURIComponent(subject)}`}
            data-primary=""
          >
            Escríbeme
          </a>
          <button type="button" className={styles.button} onClick={copy}>
            {copied ? 'Copiado' : 'Copiar correo'}
          </button>
        </div>

        {/* Confirmación anunciada sin robar el foco. */}
        <p className={styles.live} role="status" aria-live="polite">
          {copied ? 'Correo copiado al portapapeles' : ''}
        </p>

        <dl className={styles.meta}>
          <div><dt>Perfil</dt><dd>{role}</dd></div>
          <div><dt>Universidad</dt><dd>{institution}</dd></div>
          <div><dt>Portafolio</dt><dd>{year}</dd></div>
        </dl>
      </div>

      <TextureOverlay kind="grain" />
    </section>
  );
}
