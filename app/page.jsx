import Link from 'next/link';
import HomeSpline from '../components/HomeSpline';

/** Landing scene uses `@splinetool/react-spline` (client). Viewport: `.spline-home-viewport` in `globals.css` (75vw × 75vh). */
export default function Home() {
  return (
    <main className="spline-home">
      <p className="spline-home-bar">
        <Link href="/game">OPEN KTANE GAME</Link>
      </p>
      <div className="spline-home-viewport">
        <HomeSpline />
      </div>
    </main>
  );
}
