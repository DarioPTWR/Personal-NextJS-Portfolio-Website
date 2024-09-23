import clsx from 'clsx';
import { useLocale } from 'next-intl';
import Link from 'next/link';

interface Props {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  tags: string[];
}

export default function PostCard({ title, excerpt, slug, date }: Props) {
  const locale = useLocale();

  return (
    <div className="mb-8 w-full transition-all md:rounded-md">
      <div className="flex flex-col justify-between md:flex-row">
        <Link
          href={`/${locale}/blog/${slug}`}
          className="mb-2 w-full cursor-pointer text-lg font-medium text-gray-900 dark:text-gray-100 md:text-xl hover:underline">
          {title}
        </Link>
        <p className="mb-2.5 min-w-fit max-w-full text-left text-gray-900 dark:text-[#c2c2c2] md:mb-0 md:text-right">
          {new Date(date).toLocaleDateString(
            locale === 'de' ? 'de-DE' : 'en-US',
            {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            },
          )}
        </p>
      </div>
      <p className="text-gray-600 dark:text-[#c2c2c2] md:mt-1">{excerpt}</p>
    </div>
  );
}
