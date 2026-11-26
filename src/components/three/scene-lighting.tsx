"use client";

interface SceneLightingProps {
  primaryColor: string;
  secondaryColor: string;
  isDark: boolean;
}

export function SceneLighting({ primaryColor, secondaryColor, isDark }: SceneLightingProps) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.65 : 0.9} />
      <directionalLight position={[4, 5, 4]} intensity={isDark ? 1.15 : 1.0} color={primaryColor} />
      <pointLight position={[-4, -3, -2]} intensity={0.7} color={secondaryColor} />
    </>
  );
}
