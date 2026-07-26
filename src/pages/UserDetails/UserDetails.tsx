import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { NotFound } from '@/pages/NotFound/NotFound';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import styles from './UserDetails.module.scss';

export function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isLoading, isError } = useUser(id ?? '');
  const [activeTab, setActiveTab] = useState<'info' | 'location' | 'login'>('info');
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: shouldReduceMotion ? 0 : -10, transition: { duration: 0.2 } },
  };

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

  if ((activeTab === 'location' && !user.location) || (activeTab === 'login' && !user.login)) {
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
      <button
        className={styles.backButton}
        onClick={() => navigate(-1)}
        aria-label="Voltar para a lista de usuários"
      >
        Back
      </button>

      <div className={styles.wrapper}>
        <div className={styles.profileHeader}>
          <div className={styles.photoWrapper}>
            <img src={user.picture.large} alt={`Foto de ${fullName}`} />
          </div>
          <h1>{fullName}</h1>
          <p className={styles.title}>{user.name.title}</p>
        </div>

        <div className={styles.tabs} role="tablist">
          <button
            className={`${styles.tab} ${activeTab === 'info' ? styles.activeTab : ''}`}
            role="tab"
            aria-selected={activeTab === 'info'}
            aria-controls="tabpanel-info"
            id="tab-info"
            onClick={() => setActiveTab('info')}
          >
            Info
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'location' ? styles.activeTab : ''}`}
            role="tab"
            aria-selected={activeTab === 'location'}
            aria-controls="tabpanel-location"
            id="tab-location"
            onClick={() => setActiveTab('location')}
          >
            Location
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'login' ? styles.activeTab : ''}`}
            role="tab"
            aria-selected={activeTab === 'login'}
            aria-controls="tabpanel-login"
            id="tab-login"
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'info' && (
            <motion.div
              key="info"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={styles.detailsList}
              role="tabpanel"
              id="tabpanel-info"
              aria-labelledby="tab-info"
            >
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
            </motion.div>
          )}

          {activeTab === 'location' && (
            <motion.div
              key="location"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={styles.detailsList}
              role="tabpanel"
              id="tabpanel-location"
              aria-labelledby="tab-location"
            >
              <div className={styles.detailItem}>
                <span className={styles.label}>Street</span>
                <span className={styles.value}>
                  {user.location.street.name} {user.location.street.number}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>City</span>
                <span className={styles.value}>{user.location.city}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>State</span>
                <span className={styles.value}>{user.location.state}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Country</span>
                <span className={styles.value}>{user.location.country}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Postcode</span>
                <span className={styles.value}>{user.location.postcode}</span>
              </div>
            </motion.div>
          )}

          {activeTab === 'login' && (
            <motion.div
              key="login"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={styles.detailsList}
              role="tabpanel"
              id="tabpanel-login"
              aria-labelledby="tab-login"
            >
              <div className={styles.detailItem}>
                <span className={styles.label}>UUID</span>
                <span className={styles.value}>{user.login.uuid}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Username</span>
                <span className={styles.value}>{user.login.username}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
