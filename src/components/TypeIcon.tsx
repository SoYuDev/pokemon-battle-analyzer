export default function TypeIcon({ typeName }: { typeName: string }) {
  return (
    <div
      className={`poke-icon ${typeName}`}
      title={typeName}
    >
      <img
        src={`/types/${typeName}.svg`}
        alt={`${typeName} icon`}
      />
    </div>
  );
}