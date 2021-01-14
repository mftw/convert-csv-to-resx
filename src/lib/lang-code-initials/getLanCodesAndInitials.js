function getLanCodesAndInitials(lancodesAndInitials) {
  return lancodesAndInitials.reduce(
      (splittedLanCodesAndInitials, codeIni) => {
          const [lanCodes, initials] = splittedLanCodesAndInitials;
          const [lanCode, initial] = codeIni.split("_");
          lanCodes.push(lanCode);
          initials.push(initial);
          return splittedLanCodesAndInitials;
      },
      [[], [], lancodesAndInitials],
  );
}
exports.getLanCodesAndInitials = getLanCodesAndInitials;