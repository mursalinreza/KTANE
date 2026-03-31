import GameSession from '../../../components/GameSession';

/** 3D bomb only: no HUD hints, no Overly, no amber highlight ring. Timer still switches to time-up scene. */
export default function GameCleanPage() {
  return <GameSession variant="clean" />;
}
