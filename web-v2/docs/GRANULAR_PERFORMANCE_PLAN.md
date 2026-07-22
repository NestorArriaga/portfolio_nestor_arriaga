# PLAN DE RENDIMIENTO

- **Hero Image**: Solo 1 recurso en alta prioridad (`priority: high`).
- **Carga Diferida**: Previews ligeros en scroll; assets pesados solo bajo interacción (Visor).
- **Causal Loop**: Debe montarse condicionalmente y no bloquear el hilo principal.
- **Sin scroll-jacking**: Uso estricto de `IntersectionObserver` para cambiar de estado activo.
