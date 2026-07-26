import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useUser } from '@/hooks/useUser';
import { NotFound } from '@/pages/NotFound/NotFound';
import styles from './UserDetails.module.scss';

export function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isLoading, isError } = useUser(id ?? '');

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return <NotFound />;
  }

  const fullName = `${user.name.first} ${user.name.last}`;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return dateString;
    }
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.wrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          Back
        </button>

        <div className={styles.profileHeader}>
          <div className={styles.photoWrapper}>
            <img src={user.picture.large} alt={`Foto de ${fullName}`} />
          </div>
          <h1>{fullName}</h1>
          <p className={styles.title}>{user.name.title}</p>
        </div>

        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.activeTab}`}>Info</button>
          <button className={styles.tab} disabled>
            Location
          </button>
          <button className={styles.tab} disabled>
            Login
          </button>
        </div>

        <div className={styles.detailsList}>
          <div className={styles.detailItem}>
            <span className={styles.label}>First Name</span>
            <span className={styles.value}>{user.name.first}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Last Name</span>
            <span className={styles.value}>{user.name.last}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Title</span>
            <span className={styles.value}>{user.name.title}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Date</span>
            <span className={styles.value}>
              {user.registered?.date ? formatDate(user.registered.date) : '-'}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Age</span>
            <span className={styles.value}>{user.dob?.age ?? '-'}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
