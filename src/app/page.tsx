import PokemonComp from "@/components/PokemonComp";

export default function Home() {
  return (
    <>
    {/* TODO Create a parent component which wraps PokemonComp */}
      <header>
        <button>Start New Battle</button>
        <h1>Pokemon 1 vs Pokemon 2</h1>
      </header>
      <main>
        <PokemonComp></PokemonComp>
        <PokemonComp></PokemonComp>
      </main>
      <p>Winner is the one with higher Attack stat!</p>
      <button>Battle</button>
    </>
  );
}
