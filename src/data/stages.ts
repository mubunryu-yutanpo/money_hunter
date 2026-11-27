export type Stage = {
  id: number;
  name: string;
  difficulty: number;
  isUnlocked: boolean;
};

export const STAGES: readonly Stage[] = [
  {
    id: 1,
    name: "はじまりの草原",
    difficulty: 1,
    isUnlocked: true,
  },
  {
    id: 2,
    name: "まよいの森",
    difficulty: 2,
    isUnlocked: false,
  },
  {
    id: 3,
    name: "岩山のどうくつ",
    difficulty: 3,
    isUnlocked: false,
  },
];
