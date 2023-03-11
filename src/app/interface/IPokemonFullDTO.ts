export interface IPokemonFullDTO {
  name: string;
  imageUri: string;
  pokemonType: IPokemonType;
}

export interface IPokemonType {
  primaryType: string;
  secondaryType: string;
}







