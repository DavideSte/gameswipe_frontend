import { createInitialState } from "@/core/store/rootReducer";
import { RootState, setupStore } from "@/core/store/store";
import { render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const { preloadedState, ...renderOptions } = extendedRenderOptions;

  const store = preloadedState
    ? setupStore({ ...createInitialState(), ...preloadedState })
    : setupStore(createInitialState());

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
