export const GAME_CONFIG = {
  // 속도
  INITIAL_SPEED: 10,
  MAX_SPEED: 28,
  SPEED_INCREMENT: 0.3, // 초당 속도 증가

  // 레인
  LANE_WIDTH: 2.5,
  LANES: [-1, 0, 1] as const,

  // 장애물
  OBSTACLE_SPAWN_INTERVAL: 1.4, // 초
  MIN_SPAWN_INTERVAL: 0.55,
  COLLECTIBLE_SPAWN_CHANCE: 0.35,

  // 점프
  JUMP_DURATION: 0.55,
  JUMP_HEIGHT: 2.5,

  // 위치
  PLAYER_Z: 0,
  SPAWN_Z: -70,
  DESPAWN_Z: 8,

  // 충돌
  COLLISION_THRESHOLD_X: 1.2,
  COLLISION_THRESHOLD_Z: 1.5,

  // 점수
  HEART_SCORE: 100,
  DISTANCE_SCORE_RATE: 10, // 초당
} as const;
