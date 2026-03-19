import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export function CinematicEffects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.025}
      />
      <Noise
        opacity={0.025}
        blendFunction={BlendFunction.SOFT_LIGHT}
      />
      <Vignette darkness={0.4} offset={0.3} />
    </EffectComposer>
  );
}
