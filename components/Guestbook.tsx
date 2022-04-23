import { useState, useRef } from 'react';

import { signIn, useSession } from 'next-auth/react';
import useSWR, { useSWRConfig } from 'swr';
import { format } from 'date-fns';

import fetcher from 'lib/fetcher';
import useTranslation from '@/lib/useTranslation';

import SuccessMessage from '@/components/guestbook/SuccessMessage';
import ErrorMessage from '@/components/guestbook/ErrorMessage';
import LoadingSpinner from '@/components/guestbook/LoadingSpinner';

import { Form, FormState } from 'lib/types';
import { guestbook } from '@prisma/client';

type ClickEvent = {
  preventDefault: () => void;
};

type GuestBookEntryProps = {
  t: (key: string) => string;
  entry: guestbook;
  user:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
};

function GuestbookEntry({ t, entry, user }: GuestBookEntryProps) {
  const { mutate } = useSWRConfig();
  const deleteEntry = async (e: ClickEvent) => {
    e.preventDefault();

    await fetch(`/api/guestbook/${entry.id}`, {
      method: 'DELETE',
    });

    mutate('/api/guestbook');
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="w-full prose dark:prose-dark">{entry.body}</div>
      <div className="flex items-center space-x-3">
        <p className="text-sm text-gray-600 dark:text-[#c2c2c2]">
          {entry.created_by}
        </p>
        <span className=" text-gray-600 dark:text-[#c2c2c2]">/</span>
        <p className="text-sm text-gray-600 dark:text-[#c2c2c2]">
          {format(new Date(entry.updated_at), 'd MMM yyyy, k:mm')}
        </p>
        {user && entry.created_by === user.name && (
          <>
            <span className="text-gray-600 dark:text-[#c2c2c2]">/</span>
            <button
              className="text-sm text-red-600 dark:text-red-400"
              onClick={deleteEntry}>
              {t('guestbook.delete')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function Guestbook({ fallbackData }: { fallbackData: guestbook[] }) {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();
  const [form, setForm] = useState<FormState>({ state: Form.Initial });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputEl = useRef<any>(null);
  const { data: entries } = useSWR<guestbook[]>('/api/guestbook', fetcher, {
    fallbackData,
  });

  const leaveEntry = async (e: ClickEvent) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    if (inputEl.current.value.trim().length === 0) {
      setForm({ state: Form.Error, message: t('guestbook.error') });
      return;
    }

    const res = await fetch('/api/guestbook', {
      body: JSON.stringify({
        body: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const { error } = await res.json();
    if (error) {
      setForm({
        state: Form.Error,
        message: error,
      });
      return;
    }

    inputEl.current.value = '';
    mutate('/api/guestbook');
    setForm({
      state: Form.Success,
      message: t('guestbook.success'),
    });
  };

  return (
    <>
      <div className="w-full p-6 my-4 border border-blue-200 rounded dark:border-gray-800 bg-blue-50 dark:bg-blue-opaque">
        <h2 className="text-lg font-bold text-gray-900 md:text-xl dark:text-gray-100">
          {t('guestbook.form.title')}
        </h2>
        <p className="my-1 text-gray-800 dark:text-gray-200">
          {t('guestbook.form.description')}
        </p>
        {!session && (
          <button
            className="flex items-center justify-center h-8 my-4 font-bold text-gray-900 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-100 w-28"
            onClick={() => {
              signIn('google');
            }}>
            {t('guestbook.login')}
          </button>
        )}
        {session?.user && (
          <form className="relative my-4" onSubmit={leaveEntry}>
            <input
              ref={inputEl}
              aria-label="Your message"
              placeholder={t('guestbook.form.input')}
              required
              className="block w-full py-2 pl-4 pr-32 mt-1 text-gray-900 bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md dark:bg-gray-800 dark:text-gray-100"
            />
            <button
              className="absolute flex items-center justify-center h-8 px-4 py-1 font-medium text-gray-900 bg-gray-100 rounded right-1 top-1 dark:bg-gray-700 dark:text-gray-100 w-28"
              type="submit">
              {form.state === Form.Loading ? (
                <LoadingSpinner />
              ) : (
                t('guestbook.form.submit')
              )}
            </button>
          </form>
        )}
        {form.state === Form.Error ? (
          <ErrorMessage>{form.message as string}</ErrorMessage>
        ) : form.state === Form.Success ? (
          <SuccessMessage>{form.message as string}</SuccessMessage>
        ) : (
          <p className="text-sm text-gray-800 dark:text-gray-200">
            {t('guestbook.form.info')}
          </p>
        )}
      </div>
      <div className="mt-4 space-y-8">
        {entries?.map((entry) => (
          <GuestbookEntry
            key={entry.id.toString()}
            t={t}
            entry={entry}
            user={session?.user}
          />
        ))}
      </div>
    </>
  );
}
