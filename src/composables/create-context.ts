import type { InjectionKey } from 'vue';
import { inject, provide } from 'vue';

/**
 * Creates a typed Vue dependency-injection context pair: an injector and a provider.
 *
 * The injector uses a unique Symbol-based `InjectionKey` derived from `contextName`
 * (or `${providerComponentName}Context` when `providerComponentName` is a string and
 * `contextName` is omitted). The provider registers a `ContextValue` under that key.
 *
 * @param providerComponentName - The name of the providing component, or an array of names when multiple components may provide the same context; used in the runtime error message when injection fails.
 * @param contextName - Optional description used as the Symbol's description for the injection key.
 * @returns A readonly tuple `[injectContext, provideContext]` where `injectContext` retrieves the provided context (optionally using a fallback and throwing when missing) and `provideContext` registers and returns the provided `ContextValue`.
 */

/**
 * Retrieves the context value associated with the created injection key.
 *
 * @param fallback - Value to return if the context is not found. If `fallback` is exactly `null`, `null` is allowed as a valid retrieved value.
 * @returns `ContextValue` when a context value is found or a non-`null` fallback is provided; `ContextValue | null` when the explicit `fallback` is `null`.
 * @throws Error when the context is not found and no fallback (or an undefined fallback) is provided.
 */
export function createContext<ContextValue>(
  providerComponentName: string | string[],
  contextName?: string
) {
  const symbolDescription =
    typeof providerComponentName === 'string' && !contextName
      ? `${providerComponentName}Context`
      : contextName;

  const injectionKey: InjectionKey<ContextValue | null> = Symbol(symbolDescription);

  /**
   * @param fallback The context value to return if the injection fails.
   *
   * @throws When context injection failed and no fallback is specified.
   * This happens when the component injecting the context is not a child of the root component providing the context.
   */
  const injectContext = <T extends ContextValue | null | undefined = ContextValue>(
    fallback?: T
  ): T extends null ? ContextValue | null : ContextValue => {
    const context = inject(injectionKey, fallback);
    if (context) return context;

    if (context === null) return context as any;

    throw new Error(
      `Injection \`${injectionKey.toString()}\` not found. Component must be used within ${
        Array.isArray(providerComponentName)
          ? `one of the following components: ${providerComponentName.join(', ')}`
          : `\`${providerComponentName}\``
      }`
    );
  };

  const provideContext = (contextValue: ContextValue) => {
    provide(injectionKey, contextValue);
    return contextValue;
  };

  return [injectContext, provideContext] as const;
}
