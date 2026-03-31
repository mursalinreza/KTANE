import './globals.css';

export const metadata = {
  title: 'Keep Talking & Nobody Explodes — Web',
  description: 'Browser clone with split-screen defuser and Overly guide',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
