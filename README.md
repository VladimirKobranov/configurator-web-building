# Web Building Configurator

`PANELKA`

<sub>version 0.9</sub>

## Info

Web building configurator made with `React`,`Threejs`,`Fiber`,`Drei`.

**List of possibilities:**

- Length, width, height
- Entrance door position and location
- Balcony sides and locations
- Accessories with random percentage
- Global seed
- Camera rotation value

## Updating the 3D model

Put the updated model at the project root as `building.glb`, then run:

```sh
./scripts/compress-model.sh
```

The script writes a Draco-compressed model to `public/objects/building.glb`. You can also pass a source path: `./scripts/compress-model.sh path/to/model.glb`.

---

![pic_1](pics/pic_1.png)

<p align="center">
<sub >pic 1</sub>
</p>

### References

- Art style and idea: [Nastya Zhenunk](https://www.artstation.com/artwork/m8ZPZv)
