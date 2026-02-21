import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header/Header';
import { EditorArea } from './components/EditorArea/EditorArea';
import { Keyboard } from './components/Keyboard/Keyboard';
import { Settings } from './components/Settings';
import { useHistoryPersistence } from './hooks/useHistoryPersistence';
import { useAppStore } from './stores/useAppStore';
import './i18n';

function App() {
  const { i18n } = useTranslation();
  const locale = useAppStore((s) => s.locale);
  const theme = useAppStore((s) => s.theme);
  const isSettingsOpen = useAppStore((s) => s.isSettingsOpen);
  useHistoryPersistence();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'auto') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <div className="app">
      <Header />
      {isSettingsOpen ? (
        <Settings />
      ) : (
        <>
          <EditorArea />
          <Keyboard />
        </>
      )}
    </div>
  );
}

export default App;
