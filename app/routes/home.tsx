import type { Route } from "./+types/home";
import { Index } from "../index/index";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Car registry 2.0" },
    { name: "description", content: "Welcome to the car registry!" },
  ];
}

export default function Home() {
  return <Index />;
}
