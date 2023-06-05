import '../globals.css';
import { Poppins } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Next Firebase Auth Starter',
  description:
    'This is a Next.js starter kit that use Firebase Email Link for simple and secure passwordless login.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${poppins.variable} font-poppins bg-gray-100 min-h-screen  mt-10`}
      >
        <main className="flex  flex-col justify-center items-center min-h-[80vh] w-11/12 md:w-full mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
