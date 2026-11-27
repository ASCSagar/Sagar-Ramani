"use client";

interface SceneLightingProps {
  primaryColor: string;
  secondaryColor: string;
  isDark: boolean;
}

export function SceneLighting({ primaryColor, secondaryColor, isDark }: SceneLightingProps) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.6 : 0.8} />
      <directionalLight position={[4, 5, 4]} intensity={isDark ? 0.95 : 0.85} color={primaryColor} />
      <pointLight position={[-4, -3, -2]} intensity={isDark ? 0.6 : 0.5} color={secondaryColor} />
    </>
  );
}
