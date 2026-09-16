import Scene from "./Scene";

/**
 * Fixed, dialled-down version of the hero scene used behind inner pages so the
 * 3D is present site-wide. Shares the hero's lazy chunk, so on a warm cache it
 * costs nothing extra to download.
 */
export default function PageBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Scene variant="ambient" />
    </div>
  );
}
