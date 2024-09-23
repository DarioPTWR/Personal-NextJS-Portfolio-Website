import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import env from '@/env.mjs';
import Tools from '@/components/tools';
import Links from '@/components/links';

import type { Metadata } from 'next/types';

interface AboutPageProps {
  params: {
    locale: string;
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }];
}

export async function generateMetadata({
  params: { locale },
}: AboutPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'main' });
  return {
    title: t('about'),
    openGraph: {
      images: [`${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${t('about')}`],
    },
    twitter: {
      images: [`${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${t('about')}`],
    },
  };
}

const AboutPage = () => {
  const t = useTranslations();
  const age = Math.floor(
    (new Date().getTime() - new Date('2005-11-22').getTime()) / 3.15576e10,
  );
  return (
    <>
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
        {t('main.about')}
      </h1>
      <div className=" mt-2 mb-14 text-gray-600 dark:text-[#c2c2c2]">
        <p className="mb-6">{t('about-page.text-1', { age })}</p>
        <p className="mb-6">{t('about-page.text-2')}</p>
        <p>{t('about-page.text-3')}</p>
      </div>
      <h1 className="text-2xl mb-6 font-bold tracking-tight text-black dark:text-white md:text-3xl">
      {t('about-page.links.title')}
      </h1>
      <div className="mb-12">
        <p className="text-gray-500 dark:text-[#c2c2c2]">
          {t('about-page.links.text')}
        </p>
        <Links />
      </div>

      <h1 className="mb-8 text-2xl font-bold tracking-tight text-black dark:text-white md:text-3xl">
        {t('about-page.timeline.title')}
      </h1>
      <ol className="relative mb-16 border-l border-gray-200 dark:border-gray-700">
        <li className="mb-10 ml-4">
          <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-500 dark:text-[#c2c2c2]">
            {t('about-page.timeline.3.date')}
          </time>
          <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
            {t('about-page.timeline.3.title')}
          </h3>
          <p className="mb-4 mt-2 text-base font-normal text-gray-500 dark:text-[#c2c2c2]">
            {t('about-page.timeline.3.description')}
          </p>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.dsta.gov.sg/"
            aria-label="DSTA homepage">
            <div className="inline-flex cursor-pointer items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:ring-2 dark:border-gray-600 dark:bg-gray-800 dark:text-[#c2c2c2] dark:hover:bg-gray-700 dark:hover:text-white">
              {t('about-page.timeline.learn-more')}{' '}
              <ArrowRight className="ml-2 h-3 w-3" />
            </div>
          </a>
        </li>
        <li className="mb-10 ml-4">
          <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-500 dark:text-[#c2c2c2]">
          {t('about-page.timeline.2.date')}
          </time>
          <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
            {t('about-page.timeline.2.title')}
          </h3>
          <p className="mb-4 mt-2 text-base font-normal text-gray-500 dark:text-[#c2c2c2]">
            {t('about-page.timeline.2.description')}
          </p>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://better.sg/"
            aria-label="better.sg homepage">
            <div className="inline-flex cursor-pointer items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:ring-2 dark:border-gray-600 dark:bg-gray-800 dark:text-[#c2c2c2] dark:hover:bg-gray-700 dark:hover:text-white">
              {t('about-page.timeline.learn-more3')}{' '}
              <ArrowRight className="ml-2 h-3 w-3" />
            </div>
          </a>
        </li>
        <li className="ml-4">
          <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-500 dark:text-[#c2c2c2]">
            {t('about-page.timeline.1.date')}
          </time>
          <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
            {t('about-page.timeline.1.title')}
          </h3>
          <p className="mb-4 mt-2 text-base font-normal text-gray-500 dark:text-[#c2c2c2]">
            {t('about-page.timeline.1.description')}
          </p>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.linkedin.com/company/tracesafe-apac/posts/?feedView=all"
            aria-label="Tracesafe homepage">
            <div className="inline-flex cursor-pointer items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:ring-2 dark:border-gray-600 dark:bg-gray-800 dark:text-[#c2c2c2] dark:hover:bg-gray-700 dark:hover:text-white">
              {t('about-page.timeline.learn-more2')}{' '}
              <ArrowRight className="ml-2 h-3 w-3" />
            </div>
          </a>
        </li>
      </ol>

      <h1 className="mt-3 mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-3xl">
        {t('about-page.tools.title')}
      </h1>
      <div className="mb-12">
        <p className="text-gray-500 dark:text-[#c2c2c2]">
          {t('about-page.tools.text')}
        </p>
        <Tools />
      </div>
    </>
  );
};

export default AboutPage;
