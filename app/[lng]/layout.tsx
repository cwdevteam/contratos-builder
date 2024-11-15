import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Image from 'next/image'
import mesaImage from './public/images/mesa_logo.png'
import { dir } from 'i18next'
import { languages } from '../i18n/settings'
import LanguageSwitcher from '../components/LanguageSwitcher'


export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Mesa contract builder',
  description: 'create music splits contracts',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  const { lng } = await params
  //const {t} = await useTranslation(lng)

  return (
    <html lang={lng} dir={dir(lng)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="flex items-center justify-between h-20 px-4">
          <div className="flex items-center space-x-2">
          <Image
            src={mesaImage}
            width={50}
            height={50}
            alt="M"
          ></Image>
          <p className="float-left">
            <b> mesa</b>
          </p>
          </div>
          <div>
        <LanguageSwitcher/>
        </div>
          <div className="text-right text-xs">
            <p className="text-2xl font-black">MUSIC SPLITS</p>
            {/* {t('contract-builder')} */}
          </div>
        </header>
        <hr className="w-full absolute" />
        {children}
      </body>
    </html>
  )
}
