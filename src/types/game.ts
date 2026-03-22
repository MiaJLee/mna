export type GamePhase = "start" | "playing" | "gameover";
export type CharacterType = "bride" | "groom";

export interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ObstacleData extends GameObject {
  id: string;
  type: "cake" | "gift" | "chair";
  passed: boolean;
}

export interface CollectibleData extends GameObject {
  id: string;
  collected: boolean;
}
