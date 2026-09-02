import { Hero } from "@/components/sections/Hero";
import { ContextStrip } from "@/components/sections/ContextStrip";
import { Thesis } from "@/components/sections/Thesis";
import { Problem } from "@/components/sections/Problem";
import { Capabilities } from "@/components/sections/Capabilities";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <>
      <Hero />
      <ContextStrip />
      <Thesis />
      <Problem />
      <Capabilities />
      <Work />
    </>
  );
}
