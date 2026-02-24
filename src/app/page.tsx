import PokemonComp from "@/components/PokemonComp";
import PokemonCompOld from "@/components/PokemonCompOld";

export default function Home() {
  return (
    <main className="test">
      <PokemonComp></PokemonComp>
      <PokemonComp></PokemonComp>
      <PokemonCompOld></PokemonCompOld>
    </main>
  );
}
