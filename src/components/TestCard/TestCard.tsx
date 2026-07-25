import styles from './TestCard.module.scss';

export function TestCard() {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Arquitetura Sass Configurada!</h2>
      <span className={styles.badge}>CSS Modules + Variáveis Globais</span>
    </div>
  );
}
