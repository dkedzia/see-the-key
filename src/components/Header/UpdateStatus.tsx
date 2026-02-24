import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getVersion } from '@tauri-apps/api/app';
import { openUrl } from '@tauri-apps/plugin-opener';
import styles from './Header.module.css';

const GITHUB_RELEASES_URL = 'https://github.com/dkedzia/see-the-key/releases';
const GITHUB_API_URL = 'https://api.github.com/repos/dkedzia/see-the-key/releases/latest';

type Status = 'loading' | 'current' | 'available' | 'error';

function parseVersion(v: string): number[] {
  return v.replace(/^v/i, '').split('.').map((n) => parseInt(n, 10) || 0);
}

function isVersionNewer(latest: string, current: string): boolean {
  const l = parseVersion(latest);
  const c = parseVersion(current);
  for (let i = 0; i < 3; i++) {
    const a = l[i] ?? 0;
    const b = c[i] ?? 0;
    if (a > b) return true;
    if (a < b) return false;
  }
  return false;
}

export function UpdateStatus() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const currentVersion = await getVersion();
        const res = await fetch(GITHUB_API_URL);
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as { tag_name?: string };
        const latestTag = data.tag_name;
        if (!latestTag || cancelled) {
          setStatus('current');
          return;
        }
        if (isVersionNewer(latestTag, currentVersion)) {
          setStatus('available');
        } else {
          setStatus('current');
        }
      } catch {
        if (!cancelled) setStatus('error');
      }
    }

    const timeout = setTimeout(check, 1500);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  const handleClick = () => {
    openUrl(GITHUB_RELEASES_URL);
  };

  if (status === 'loading' || status === 'error') return null;

  if (status === 'available') {
    return (
      <button
        type="button"
        className={`${styles.updateStatus} ${styles.updateStatusAvailable}`}
        onClick={handleClick}
        aria-label={t('updateAvailable')}
      >
        {t('updateAvailable')}
      </button>
    );
  }

  return (
    <span className={`${styles.updateStatus} ${styles.updateStatusCurrent}`} aria-label={t('updateCurrent')}>
      {t('updateCurrent')}
    </span>
  );
}
