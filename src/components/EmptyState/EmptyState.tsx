import styles from './EmptyState.module.scss';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

export function EmptyState({
  title = 'Nenhum resultado encontrado',
  subtitle = 'Tente novamente utilizando outro termo',
}: EmptyStateProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
}
