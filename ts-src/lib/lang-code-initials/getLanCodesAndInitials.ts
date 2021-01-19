

// export type LancodesAndInitials = string[]
// export type LanCode = string | number;
// export type Initials = string;
// export type RawRows = string[]
// export type LanCodesAndInitials = [
//   LanCode[],
//   Initials[],
//   RawRows

import type { RawRows } from "../../types/types";

// ]
export function getLanCodesAndInitials(raw: RawRows) {
  return raw.reduce(
      (splittedLanCodesAndInitials, codeIni) => {
          const [lanCodes, initials] = splittedLanCodesAndInitials;
          const [lanCode, initial] = codeIni.split("_");
          lanCodes.push(lanCode);
          initials.push(initial);
          return splittedLanCodesAndInitials;
      },
      [[], [], raw],
  );
}
