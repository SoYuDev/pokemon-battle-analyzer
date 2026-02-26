import { create } from "zustand";

interface BattleState {
  isFighting: boolean;
  toggleFight: () => void;
}

export const useBattleStore = create<BattleState>((set) => ({
  // Initial state
  isFighting: false,
  toggleFight: () => set((state) => ({ isFighting: !state.isFighting })),
}));

// interface CounterState {
//   count: number;
//   increment: () => void;
//   decrement: () => void;
// }

// export const useCounterStore = create<CounterState>((set) => ({
//   count: 0,
//   increment: () => set((state) => ({ count: state.count + 1 })),
//   decrement: () => set((state) => ({ count: state.count - 1 })),
// }));
