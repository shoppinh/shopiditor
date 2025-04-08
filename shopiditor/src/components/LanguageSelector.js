import React from 'react';
import { LANGUAGES, LANGUAGE_NAMES } from '../constants/languages';

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  const languages = Object.values(LANGUAGES).map(langId => ({
    id: langId,
    name: LANGUAGE_NAMES[langId]
  }));

  const handleChange = (e) => {
    if (onLanguageChange) {
      onLanguageChange(e.target.value);
    }
  };

  return (
    <div className="flex items-center">
      <label htmlFor="language-select" className="mr-2 font-medium">
        Language:
      </label>
      <select
        id="language-select"
        className="px-2 py-1 border rounded bg-white"
        value={selectedLanguage}
        onChange={handleChange}
      >
        {languages.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector; 