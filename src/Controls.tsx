import { useContext, useEffect, useId } from "react";
import type { ReactNode } from "react";
import { Settings2 } from "lucide-react";
import { SliderContext, type DoorSide } from "./configurator-context";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface RangeControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  format?: (value: number) => ReactNode;
}

function RangeControl({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format = (currentValue) => currentValue,
}: RangeControlProps) {
  const id = useId();

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3">
        <Label id={`${id}-label`} className="text-sm font-medium">
          {label}
        </Label>
        <output
          htmlFor={id}
          className="min-w-10 rounded-md bg-muted px-2 py-0.5 text-right text-xs font-semibold tabular-nums text-foreground"
        >
          {format(value)}
        </output>
      </div>
      <Slider
        id={id}
        aria-label={label}
        aria-labelledby={`${id}-label`}
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(values) =>
          onChange(Array.isArray(values) ? values[0] : values)
        }
      />
    </div>
  );
}

interface ToggleFieldProps {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

function ToggleField({
  id,
  label,
  checked,
  onCheckedChange,
}: ToggleFieldProps) {
  return (
    <label
      htmlFor={id}
      className="flex min-h-8 cursor-pointer items-center gap-2 rounded-md px-1 text-xs hover:bg-muted/60"
    >
      <Checkbox
        id={id}
        aria-label={label}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <span>{label}</span>
    </label>
  );
}

interface ControlsProps {
  open: boolean;
  onToggle: () => void;
}

function Controls({ open, onToggle }: ControlsProps) {
  const {
    sliderValueX,
    setSliderValueX,
    sliderValueY,
    setSliderValueY,
    sliderValueZ,
    setSliderValueZ,
    seed,
    setSeed,
    rotateSpeed,
    setRotateSpeed,
    doorSide,
    setDoorSide,
    doorPosition,
    setDoorPosition,
    balconyPosition,
    setBalconyPosition,
    balconySide,
    setBalconySide,
    pipeBool,
    setPipeBool,
    airCondPercentage,
    setAirCondPercentage,
    roofAccessoriesPercentage,
    setRoofAccessoriesPercentage,
    balconyAccessoriesPercentage,
    setBalconyAccessoriesPercentage,
  } = useContext(SliderContext);

  const maxBalconyPosition = Math.max(
    1,
    Math.max(sliderValueX, sliderValueZ) - 2,
  );
  const sideLength =
    doorSide === "Front" || doorSide === "Back" ? sliderValueZ : sliderValueX;
  const maxDoorPosition = Math.max(1, sideLength - 2);
  const canPlaceDoor = sideLength > 2;

  useEffect(() => {
    setBalconyPosition((positions) =>
      positions.filter(
        (position) => position >= 1 && position <= maxBalconyPosition,
      ),
    );
  }, [maxBalconyPosition, setBalconyPosition]);

  function updateDimension(side: "x" | "y" | "z", value: number) {
    if (side === "x") {
      setSliderValueX(value);
      if (doorSide === "Left" || doorSide === "Right") {
        setDoorPosition((position) =>
          Math.min(position, Math.max(1, value - 2)),
        );
      }
    } else if (side === "y") {
      setSliderValueY(value);
    } else {
      setSliderValueZ(value);
      if (doorSide === "Front" || doorSide === "Back") {
        setDoorPosition((position) =>
          Math.min(position, Math.max(1, value - 2)),
        );
      }
    }
  }

  function updateDoorSide(side: string) {
    if (!("Front Back Left Right".split(" ") as string[]).includes(side)) {
      return;
    }
    const selectedSide = side as DoorSide;
    setDoorSide(selectedSide);
    const length =
      selectedSide === "Front" || selectedSide === "Back"
        ? sliderValueZ
        : sliderValueX;
    setDoorPosition((position) => Math.min(position, Math.max(1, length - 2)));
  }

  function toggleBalconyPosition(position: number) {
    setBalconyPosition((current) =>
      current.includes(position)
        ? current.filter((item) => item !== position)
        : [...current, position].sort((a, b) => a - b),
    );
  }

  return (
    <aside
      aria-label="Configurator settings"
      className={`absolute right-4 top-4 z-10 flex w-[min(25rem,calc(100%_-_2rem))] min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-background/95 shadow-2xl backdrop-blur-md ${open ? "max-h-[calc(100dvh_-_2rem)]" : ""}`}
    >
      <header className={open ? "border-b border-border" : ""}>
        <Button
          type="button"
          variant="ghost"
          className="h-auto w-full justify-start gap-3 rounded-none px-5 py-4 text-left hover:bg-muted/50"
          aria-controls="configurator-settings-content"
          aria-expanded={open}
          onClick={onToggle}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Settings2 className="size-4" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-base font-semibold tracking-tight text-foreground">
              Configurator
            </span>
            <span className="block text-xs text-muted-foreground">
              Shape your panelka
            </span>
          </span>
        </Button>
      </header>

      <div
        id="configurator-settings-content"
        hidden={!open}
        className="min-h-0 overflow-y-auto overscroll-contain px-4 py-1 md:px-5"
      >
        <section className="space-y-3 border-b border-border py-4 last:border-b-0">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Building size
          </h2>
          <div className="space-y-3">
            <RangeControl
              label="Depth"
              value={sliderValueX}
              min={0}
              max={12}
              onChange={(value) => updateDimension("x", value)}
            />
            <RangeControl
              label="Width"
              value={sliderValueZ}
              min={0}
              max={12}
              onChange={(value) => updateDimension("z", value)}
            />
            <RangeControl
              label="Height"
              value={sliderValueY}
              min={0}
              max={12}
              onChange={(value) => updateDimension("y", value)}
            />
          </div>
        </section>

        <section className="space-y-3 border-b border-border py-4 last:border-b-0">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Entrance
          </h2>
          <div className="space-y-3">
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium">Door side</legend>
              <RadioGroup
                aria-label="Door side"
                value={doorSide}
                onValueChange={updateDoorSide}
                className="grid grid-cols-2 gap-1 sm:grid-cols-4"
              >
                {["Front", "Back", "Left", "Right"].map((side) => {
                  const id = `door-side-${side.toLowerCase()}`;
                  return (
                    <label
                      key={side}
                      htmlFor={id}
                      className="flex min-h-9 cursor-pointer items-center gap-2 rounded-md px-2 text-xs hover:bg-muted/60"
                    >
                      <RadioGroupItem id={id} value={side} aria-label={side} />
                      <span>{side}</span>
                    </label>
                  );
                })}
              </RadioGroup>
            </fieldset>
            <RangeControl
              label="Door position"
              value={Math.min(doorPosition, maxDoorPosition)}
              min={1}
              max={maxDoorPosition}
              onChange={setDoorPosition}
            />
            {!canPlaceDoor && (
              <p className="text-xs text-muted-foreground" role="status">
                This side needs at least 3 units for an entrance position.
              </p>
            )}
          </div>
        </section>

        <section className="space-y-3 border-b border-border py-4 last:border-b-0">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Balconies
          </h2>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Balcony positions</Label>
              <div
                className="grid grid-cols-6 gap-1"
                role="group"
                aria-label="Balcony positions"
              >
                {Array.from({ length: maxBalconyPosition }, (_, index) => {
                  const position = index + 1;
                  const selected = balconyPosition.includes(position);
                  return (
                    <Button
                      key={position}
                      type="button"
                      size="sm"
                      variant={selected ? "default" : "outline"}
                      aria-label={`Position ${position}`}
                      aria-pressed={selected}
                      onClick={() => toggleBalconyPosition(position)}
                      className="w-full"
                    >
                      {position}
                    </Button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                Select positions for enabled facade sides.
              </p>
            </div>
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium">Facade sides</legend>
              <ToggleGroup
                multiple
                value={balconySide}
                onValueChange={setBalconySide}
                aria-label="Balcony facade sides"
                variant="outline"
                size="lg"
                className="w-full flex-nowrap"
              >
                {["Front", "Back", "Left", "Right"].map((side) => (
                  <ToggleGroupItem
                    key={side}
                    value={side}
                    aria-label={side}
                    className="min-w-0 flex-1 justify-center px-2 aria-pressed:bg-primary aria-pressed:text-primary-foreground"
                  >
                    {side}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </fieldset>
          </div>
        </section>

        <section className="space-y-3 border-b border-border py-4 last:border-b-0">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Accessories
          </h2>
          <div className="space-y-2">
            <ToggleField
              id="accessory-pipes"
              label="Flood pipes"
              checked={pipeBool}
              onCheckedChange={setPipeBool}
            />
            <div>
              <RangeControl
                label="Air conditioners"
                value={airCondPercentage}
                min={0}
                max={100}
                format={(value) => `${value}%`}
                onChange={setAirCondPercentage}
              />
            </div>
            <div>
              <RangeControl
                label="Roof accessories"
                value={roofAccessoriesPercentage}
                min={0}
                max={100}
                format={(value) => `${value}%`}
                onChange={setRoofAccessoriesPercentage}
              />
            </div>
            <div>
              <RangeControl
                label="Balcony gardens"
                value={balconyAccessoriesPercentage}
                min={0}
                max={100}
                format={(value) => `${value}%`}
                onChange={setBalconyAccessoriesPercentage}
              />
            </div>
          </div>
        </section>

        <section className="space-y-3 border-b border-border py-4 last:border-b-0">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Generation
          </h2>
          <div className="space-y-3">
            <RangeControl
              label="Seed"
              value={seed}
              min={0}
              max={100}
              onChange={setSeed}
            />
            <RangeControl
              label="Camera rotation"
              value={rotateSpeed}
              min={0}
              max={5}
              step={0.1}
              onChange={setRotateSpeed}
              format={(value) => Number(value).toFixed(1)}
            />
          </div>
        </section>
      </div>
    </aside>
  );
}

export default Controls;
