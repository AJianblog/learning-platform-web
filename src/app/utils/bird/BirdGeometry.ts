import { BufferAttribute, BufferGeometry, Color } from "three";
/* TEXTURE WIDTH FOR SIMULATION */
const WIDTH = 32;

const BIRDS = WIDTH * WIDTH;

export class BirdGeometry extends BufferGeometry {

  constructor() {

    super();

    const trianglesPerBird = 3;
    const triangles = BIRDS * trianglesPerBird;
    const points = triangles * 3;

    const vertices = new BufferAttribute(new Float32Array(points * 3), 3);
    const birdColors = new BufferAttribute(new Float32Array(points * 3), 3);
    const references = new BufferAttribute(new Float32Array(points * 2), 2);
    const birdVertex = new BufferAttribute(new Float32Array(points), 1);

    this.setAttribute('position', vertices);
    this.setAttribute('birdColor', birdColors);
    this.setAttribute('reference', references);
    this.setAttribute('birdVertex', birdVertex);

    let v = 0;

    function addVertices(...args: any[]) {

      for (let i = 0; i < args.length; i++) {
        // @ts-ignore
        vertices.array[v++] = args[i];
      }

    }

    const wingsSpan = 20;

    for (let f = 0; f < BIRDS; f++) {
      addVertices(
        0, -0, -20,
        0, 4, -20,
        0, 0, 30
      );
      // Wings
      addVertices(
        0, 0, -15,
        -wingsSpan, 0, 0,
        0, 0, 15
      );
      addVertices(
        0, 0, 15,
        wingsSpan, 0, 0,
        0, 0, -15
      );
    }
    for (let v = 0; v < triangles * 3; v++) {
      const triangleIndex = ~~(v / 3);
      const birdIndex = ~~(triangleIndex / trianglesPerBird);
      const x = (birdIndex % WIDTH) / WIDTH;
      const y = ~~(birdIndex / WIDTH) / WIDTH;
      const co = '#0cf818'
      const c = new Color(
        0xee1111 +
        ~~(v / 9) / BIRDS * 0xf48c15
      );
      // @ts-ignore
      birdColors.array[v * 3] = c.r;
      // @ts-ignore
      birdColors.array[v * 3 + 1] = c.g;
      // @ts-ignore
      birdColors.array[v * 3 + 2] = c.b;
      // @ts-ignore
      references.array[v * 2] = x;
      // @ts-ignore
      references.array[v * 2 + 1] = y;
      // @ts-ignore
      birdVertex.array[v] = v % 9;
    }
    this.scale(0.2, 0.2, 0.2);
  }

}
