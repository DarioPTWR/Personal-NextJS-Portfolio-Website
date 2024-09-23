'use client';

export default function Footer() {
  return (
    <div className="flex flex-col justify-center bg-gray-50 px-8 dark:bg-gray-800">
      <footer className="mx-auto mb-8 w-full max-w-3xl">
        <hr className="mb-4 w-full border border-gray-200 bg-gray-200 dark:border-gray-700 dark:bg-gray-700" />
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            © 2024
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Dario Prawara Teh
          </p>
        </div>
      </footer>
    </div>
  );
}