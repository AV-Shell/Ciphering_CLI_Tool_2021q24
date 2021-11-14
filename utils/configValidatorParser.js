const helper = {
  C: { hasFlags: true, flags: ["0", "1"], length: 2 },
  R: { hasFlags: true, flags: ["0", "1"], length: 2 },
  A: { hasFlags: false, length: 1 },
};

const actions = {
  0: "decode",
  1: "encode",
};

const configValidatorParser = (config, Err) => {
  const myErr = new Err(`Config "${config}" is incorrect`);

  if (typeof config !== "string") {
    throw myErr;
  }

  const confArray = config.split("-");
  let result = [];
  confArray.forEach((el) => {
    const helperEl = helper[el[0]];
    if (helperEl) {
      if (
        el.length !== helperEl.length ||
        (helperEl.hasFlags && !helperEl.flags?.includes(el[1]))
      ) {
        throw myErr;
      } else {
        result.push({
          type: el[0],
          action: actions[el[1]] ?? "encode",
        });
      }
    } else {
      throw myErr;
    }
  });

  return result;
};

module.exports = { configValidatorParser };
