declare module "seedrandom" {
  export default function seedrandom(seed?: string | number): () => number;
}
