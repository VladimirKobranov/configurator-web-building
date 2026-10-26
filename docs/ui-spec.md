# UI specification: building configurator

## Purpose

Replace the existing Chakra UI controls with shadcn components built on Base UI, using preset `b3lV3fyS8`, while preserving the configurator's behavior. This specification records the current UI contract before any old UI is removed and defines the behavior that must survive the migration.

## Page structure

- A 3D building preview occupies the main area.
- Configuration controls live in a vertically scrollable panel on the right.
- The current desktop panel is 400 px wide; the preview uses the remaining width.
- The panel has a “Configurator” title, grouped settings, and a footer with the GitHub link and current year.
- The preview remains interactive with OrbitControls and automatically rotates at the selected speed.
- The control panel and preview share one configuration state; changing a control updates the preview.

## Controls and behavior

### Building dimensions

Three integer sliders set the building dimensions:

| UI label | State | Initial value | Range | Step |
| --- | --- | ---: | ---: | ---: |
| Depth number | `sliderValueX` | 5 | 0–12 | 1 |
| Height number | `sliderValueY` | 5 | 0–12 | 1 |
| Width number | `sliderValueZ` | 8 | 0–12 | 1 |

Changing a dimension rebuilds the 3D model. Keep the labels and displayed values visible next to their controls.

### Entrance door

- A single-choice group selects `Front`, `Back`, `Left`, or `Right`.
- Initial side: `Front`.
- An integer slider selects a position along the chosen side. Initial position: 2.
- Current range is 1 through the length of the selected side minus two: `sliderValueZ - 2` for Front/Back and `sliderValueX - 2` for Left/Right.
- The selected side and position affect which facade tile becomes the door.
- The current range becomes invalid for small dimensions; the replacement must keep the control in a valid, understandable state when the selected side has no interior position. Do not silently place a door outside the chosen side.

### Balconies

- A text input accepts comma-separated integer positions; initial positions: `1, 3, 4, 6`.
- On blur, valid integers become the balcony positions. If parsing yields no integers, current behavior restores `[1, 3]`.
- Four independent checkboxes choose facade sides: Front and Back start checked; Left and Right start unchecked.
- Balcony windows are generated only on enabled sides and selected positions.

### Accessories

Four independent checkboxes enable or disable accessory generation. All start enabled:

| Setting | State | Initial probability |
| --- | --- | ---: |
| Flood pipes | `pipeBool` | Not applicable |
| Air conditioners | `airCondBool` | 25% |
| Roof stuff | `roofAccessoriesBool` | 10% |
| Balcony gardens | `balconyAccessoriesBool` | 20% |

Three integer sliders control accessory probabilities from 0% to 100%, step 1. Show each current percentage alongside its slider. Probability controls affect only their matching accessory type.

### Additional settings

- Seed: integer slider, initial 50, range 0–100, step 1. The same seed and configuration produce the same randomized facade/accessory selection.
- Camera rotation speed: slider, initial 0.2, range 0–5, step 0.1. It controls OrbitControls auto-rotation speed.

## Interaction and accessibility requirements

- Every input has a persistent visible label; placeholder text is supplemental only.
- Group related settings with semantic headings/fieldset legends. Single-choice door side uses radio semantics; independent toggles use checkbox semantics.
- All controls must work by keyboard and show a visible focus indicator. Labels and current values must remain understandable without color alone.
- Numeric sliders expose their current value, minimum, maximum, and step to assistive technology.
- Keep the settings panel scrollable without trapping keyboard focus. Preserve a usable 3D preview while the panel is open.
- Inputs and tap targets must remain practical at narrow viewports. The supplied Base UI design should determine the final mobile arrangement; there must be no clipped controls or horizontal page overflow.

## Migration boundaries

- Replace Chakra UI presentation components and Chakra-specific layout/styling in the page and controls.
- Preserve the existing state ownership and model-generation behavior unless a behavior change is explicitly agreed.
- Keep the 3D scene, assets, and preview interaction intact.
- Use the shadcn preset `b3lV3fyS8` as the source of truth for visual style, with Base UI as the component primitive library.
- Keep generated UI components in JavaScript/JSX to match the existing application.
- Remove Chakra dependencies only after all Chakra imports/usages have been migrated and the new UI passes the project checks.

## Acceptance criteria

1. The new UI matches the supplied shadcn/Base UI code and preset styling.
2. Every control listed above remains present, with the same initial value, range, step, and effect on the preview unless the user approves a documented behavior change.
3. Configuration changes update the preview; seed remains deterministic.
4. The settings panel remains usable on desktop and narrow screens, with keyboard-operable controls and visible focus.
5. No Chakra UI components, theme setup, or styles remain after migration is complete.
6. `npm run check` and `npm run build` pass.

## Source of current behavior

This specification is based on `src/Controls.jsx`, `src/ChakraInit.jsx`, `src/App.jsx`, and `src/Footer.jsx` as they stand before the shadcn/Base UI migration.
