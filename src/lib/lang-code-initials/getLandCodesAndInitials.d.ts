
export type TLanCodesAndInitials = string[];
export type TReturn = [
  lanCodes: string[],
  initials: string[],
  lancodesAndInitials: string[],
]
export declare function getLandCodesAndInitials(lancodesAndInitials: TLanCodesAndInitials): TReturn;