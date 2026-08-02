'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

function Starfield(props: any) {
  const ref = useRef<any>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const sphere = useMemo(() => {
    // Generate random points in a sphere. We keep the count reasonable for performance.
    const positions = random.inSphere(new Float32Array(1500 * 3), { radius: 1.5 });
    return positions as Float32Array;
  }, []);

  useFrame((state, delta) => {
    if (ref.current && !prefersReducedMotion) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#888888"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function HeroScene() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 -z-10 bg-transparent">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
        <Starfield />
      </Canvas>
    </div>
  );
}
