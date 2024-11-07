'use client';

import React, { useState } from 'react';
import i18next from 'i18next';
import globe from './../[lng]/public/images/globe.png'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation';

// Define the language type as a union of language codes
type Language = 'en' | 'es';

const LanguageSwitcher: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (language: Language) => {
    i18next.changeLanguage(language);
    setShowDropdown(false);

    const newPath = `/${language}${pathname.replace(/^\/(en|es)/, '')}`;
    router.push(newPath);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Image
        src={globe}
        alt="Language Selector"
        onClick={toggleDropdown}
        style={{ cursor: 'pointer', width: '24px', height: '24px' }}
      />

      {showDropdown && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: 'black',
            color:'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100px',
            zIndex: 10,
          }}
        >
          <div
            onClick={() => handleLanguageChange('en')}
            style={{ padding: '8px', cursor: 'pointer' }}
          >
            English
          </div>
          <div
            onClick={() => handleLanguageChange('es')}
            style={{ padding: '8px', cursor: 'pointer' }}
          >
            Español
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
