// i18n — the package's translate-injection seam.
//
// Products pass `t` on the component (`<LanesPanel t={...}>`); it flows
// down through this context so node/row sub-components read it with the
// same `const __t = useT()` shape the original product code used. The
// default is the identity translate (Chinese source strings render
// verbatim; vars `{name}` still interpolate).
import { createContext, useContext } from "react";
import { identityTranslate, type Translate } from "./schema-form";

export const TContext = createContext<Translate>(identityTranslate);
export const useT = (): Translate => useContext(TContext);
export { identityTranslate };
export type { Translate };
