import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header/Header';
import { EditorArea } from './components/EditorArea/EditorArea';
import { Keyboard } from './components/Keyboard/Keyboard';
import { useHistoryPersistence } from './hooks/useHistoryPersistence';
import { useAppStore } from './stores/useAppStore';
import './i18n';

function App() {
  const { i18n } = useTranslation();
  const locale = useAppStore((s) => s.locale);
  useHistoryPersistence();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  return (
    <div className="app">
      <Header />
      <EditorArea />
      <Keyboard />
    </div>
  );
}

export default App;
