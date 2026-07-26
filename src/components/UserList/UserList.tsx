import { Link } from 'react-router-dom';
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
              <th className={styles.hideMobile}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className={styles.skeletonRow}>
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
                <td className={styles.hideMobile}>
                  <div className={styles.skeletonBar} style={{ width: '80px' }} />
                </td>
              </tr>
            ))}
          </tbody>
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
            <th className={styles.hideMobile}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const shortUuid = user.login.uuid ? user.login.uuid.slice(0, 12) : '-';
            const formattedDate = user.registered?.date ? formatDate(user.registered.date) : '-';

            return (
              <tr key={user.login.uuid}>
                <td className={styles.idCell} title={user.login.uuid}>
                  {shortUuid}
                </td>
                <td>{user.name.first}</td>
                <td className={styles.hideMobile}>{user.name.last}</td>
                <td className={styles.hideMobile}>{user.name.title || '-'}</td>
                <td className={styles.hideMobile}>{formattedDate}</td>
                <td className={styles.hideMobile}>{user.dob?.age ?? '-'}</td>
                <td className={styles.hideMobile}>
                  <Link to={`/user/${user.login.uuid}`} className={styles.viewProfileLink}>
                    View profile
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
