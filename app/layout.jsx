import './globals.css';

export const metadata = {
  title: 'Keep Talking & Nobody Explodes — Web',
  description:
    'Keep Talking & Nobody Explodes in the browser — guided play with amber ring on the bomb, clean 3D-only mode, and expert manual.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
