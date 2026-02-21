import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header/Header';
import { EditorArea } from './components/EditorArea/EditorArea';
import { Keyboard } from './components/Keyboard/Keyboard';
import { Settings } from './components/Settings';
import { SetsView } from './components/SetsView';
import { useSetsPersistence } from './hooks/useSetsPersistence';
import { useAppStore } from './stores/useAppStore';
import './i18n';

function App() {
  const { i18n } = useTranslation();
  const locale = useAppStore((s) => s.locale);
  const theme = useAppStore((s) => s.theme);
  const isSettingsOpen = useAppStore((s) => s.isSettingsOpen);
  const isSetsViewOpen = useAppStore((s) => s.isSetsViewOpen);
  const isKeyboardVisible = useAppStore((s) => s.isKeyboardVisible);
  useSetsPersistence();

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
      {isSetsViewOpen ? (
        <>
          <SetsView />
          {isKeyboardVisible && <Keyboard />}
        </>
      ) : isSettingsOpen ? (
        <Settings />
      ) : (
        <>
          <EditorArea />
          {isKeyboardVisible && <Keyboard />}
        </>
      )}
    </div>
  );
}

export default App;
