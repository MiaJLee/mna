export type GamePhase = "start" | "playing" | "gameover";

export type ObstacleType = "cake" | "bouquet" | "chair" | "gift";

export interface ObstacleData {
  id: string;
  type: ObstacleType;
  lane: number; // -1, 0, 1
  z: number;
}

export interface CollectibleData {
  id: string;
  lane: number;
  z: number;
  collected: boolean;
}
