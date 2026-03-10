// see https://svelte.dev/docs/kit/types#app.d.ts
import type { PublicSafeSession } from '$lib/utils/transform/server/session';
import type { PublicSafeUser } from '$lib/utils/transform/server/user';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user?: PublicSafeUser | null;
      session?: PublicSafeSession | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}
