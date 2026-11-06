import Clarity from '@microsoft/clarity';
const CLARITY_PROJECT_ID = 'ode6xkbc19';
import { onMounted } from 'vue';

export function useClarity() {
  onMounted(() => {
    if (import.meta.env.DEV) return;

    Clarity.init(CLARITY_PROJECT_ID);
  });
}
