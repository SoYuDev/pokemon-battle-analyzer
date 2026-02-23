export default function PokemonComp({ name }: { name: string }) {
  const randomId: number = Math.floor(Math.random() * 1025) + 1;
  console.log(randomId);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}
