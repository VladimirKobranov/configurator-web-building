import { useContext, useEffect, useState } from "react";
import { SliderContext } from "./configurator-context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

function DebugSlider({ label, value, min, max, step = 1, onChange }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <Label>{label}</Label>
        <output className="tabular-nums text-muted-foreground">{value}</output>
      </div>
      <Slider
        aria-label={label}
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(values) => onChange(values[0])}
      />
    </div>
  );
}

function readCamera(controls) {
  if (!controls) return null;
  return {
    position: controls.object.position
      .toArray()
      .map((value) => value.toFixed(3)),
    target: controls.target.toArray().map((value) => value.toFixed(3)),
  };
}

export default function DebugPanel({ orbitControlsRef }) {
  const {
    lightAzimuth,
    setLightAzimuth,
    lightHeight,
    setLightHeight,
    lightIntensity,
    setLightIntensity,
  } = useContext(SliderContext);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    const updateCamera = () => setCamera(readCamera(orbitControlsRef.current));
    updateCamera();
    const interval = window.setInterval(updateCamera, 250);
    return () => window.clearInterval(interval);
  }, [orbitControlsRef]);

  function saveCamera() {
    const controls = orbitControlsRef.current;
    const currentCamera = readCamera(controls);
    if (!controls || !currentCamera) return;
    controls.saveState();
    console.log("Camera settings:", currentCamera);
    setCamera(currentCamera);
  }

  return (
    <aside className="absolute left-4 top-4 z-20 w-64 space-y-4 rounded-xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur">
      <div>
        <h2 className="text-sm font-semibold">Development controls</h2>
        <p className="text-xs text-muted-foreground">Temporary scene tuning</p>
      </div>
      <DebugSlider
        label="Light angle"
        value={lightAzimuth}
        min={0}
        max={360}
        onChange={setLightAzimuth}
      />
      <DebugSlider
        label="Light height"
        value={lightHeight}
        min={0.5}
        max={3}
        step={0.1}
        onChange={setLightHeight}
      />
      <DebugSlider
        label="Light intensity"
        value={lightIntensity}
        min={0}
        max={10}
        step={0.1}
        onChange={setLightIntensity}
      />
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline" size="sm" onClick={saveCamera}>
          Save camera
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => orbitControlsRef.current?.reset()}
        >
          Reset camera
        </Button>
      </div>
      <div className="space-y-2 border-t border-border pt-3 font-mono text-[10px] text-muted-foreground">
        <div>
          <div>Position</div>
          <output>
            {camera ? `[${camera.position.join(", ")}]` : "Loading…"}
          </output>
        </div>
        <div>
          <div>Target</div>
          <output>
            {camera ? `[${camera.target.join(", ")}]` : "Loading…"}
          </output>
        </div>
      </div>
    </aside>
  );
}
