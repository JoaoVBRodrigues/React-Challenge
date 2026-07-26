import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import type { User } from '@/types/user';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import styles from './UserList.module.scss';

interface UserListProps {
  users?: User[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

export function UserList({
  users = [],
  isLoading = false,
  isError = false,
  errorMessage = 'Não foi possível carregar os usuários.',
}: UserListProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };
  if (isError) {
    return <div className={styles.errorMessage}>{errorMessage}</div>;
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th className={styles.hideMobile}>Last Name</th>
              <th className={styles.hideMobile}>Title</th>
              <th className={styles.hideMobile}>Date</th>
              <th className={styles.hideMobile}>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.tr key={index} className={styles.skeletonRow} variants={itemVariants}>
                <td>
                  <div className={styles.skeletonBar} style={{ width: '80px' }} />
                </td>
                <td>
                  <div className={styles.skeletonBar} style={{ width: '100px' }} />
                </td>
                <td className={styles.hideMobile}>
                  <div className={styles.skeletonBar} style={{ width: '100px' }} />
                </td>
                <td className={styles.hideMobile}>
                  <div className={styles.skeletonBar} style={{ width: '50px' }} />
                </td>
                <td className={styles.hideMobile}>
                  <div className={styles.skeletonBar} style={{ width: '90px' }} />
                </td>
                <td className={styles.hideMobile}>
                  <div className={styles.skeletonBar} style={{ width: '40px' }} />
                </td>
                <td>
                  <div className={styles.skeletonBar} style={{ width: '80px' }} />
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    );
  }

  if (!users.length) {
    return <EmptyState />;
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th className={styles.hideMobile}>Last Name</th>
            <th className={styles.hideMobile}>Title</th>
            <th className={styles.hideMobile}>Date</th>
            <th className={styles.hideMobile}>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
          {users.map((user) => {
            const shortUuid = user.login.uuid ? user.login.uuid.slice(0, 12) : '-';
            const formattedDate = user.registered?.date ? formatDate(user.registered.date) : '-';

            return (
              <motion.tr key={user.login.uuid} variants={itemVariants}>
                <td className={styles.idCell} title={user.login.uuid}>
                  {shortUuid}
                </td>
                <td>{user.name.first}</td>
                <td className={styles.hideMobile}>{user.name.last}</td>
                <td className={styles.hideMobile}>{user.name.title || '-'}</td>
                <td className={styles.hideMobile}>{formattedDate}</td>
                <td className={styles.hideMobile}>{user.dob?.age ?? '-'}</td>
                <td>
                  <Link to={`/user/${user.login.uuid}`} className={styles.viewProfileLink}>
                    View profile
                  </Link>
                </td>
              </motion.tr>
            );
          })}
        </motion.tbody>
      </table>
    </div>
  );
}
