import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import styles from './NotFound.module.scss';

export function NotFound() {
  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Página Não Encontrada</h2>
        <p className={styles.description}>
          Desculpe, o perfil ou a página que você está procurando não existe ou foi removida.
        </p>
        <Link to="/" className={styles.homeButton}>
          Voltar para a Home
        </Link>
      </motion.div>
    </div>
  );
}
