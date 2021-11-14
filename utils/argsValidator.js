class Parser {
  constructor(config) {
    this._config = { errorClass: Error, ...config };
    this._options = {};
    this._results = {};
  }

  setOption(option) {
    this._options[option.name] = option;
    return this;
  }

  getOptionIndex(option) {
    return this._optionsArray.findIndex((el) => el.keys.includes(option));
  }

  parse(args) {
    let argsArray = args.slice(2);
    this._optionsArray = Object.values(this._options);

    let hasOptions;

    do {
      hasOptions = false;
      let el = argsArray[0];
      let index = this.getOptionIndex(el);
      if (index >= 0) {
        if (
          this._results.hasOwnProperty(this._optionsArray[index].name) &&
          !this._config.canDuplicate
        ) {
          throw new this._config.errorClass(
            `Duplicate argument "${this._optionsArray[index].name}"`
          );
        }
        if (argsArray.length >= 2 && this.getOptionIndex(argsArray[1]) < 0) {
          this._results[this._optionsArray[index].name] = argsArray[1];
          argsArray = argsArray.slice(2);
          hasOptions = true;
        } else {
          throw new this._config.errorClass(
            `No value for argument "${this._optionsArray[index].name}"`
          );
        }
      }
    } while (hasOptions);

    if (argsArray.length > 0) {
      throw new this._config.errorClass(
        `Unknown argument "${JSON.stringify(argsArray[0])}"`
      );
    }

    this._optionsArray.forEach((el) => {
      if (el.require && !this._results.hasOwnProperty(el.name)) {
        throw new this._config.errorClass(`Argument "${el.name}" is required`);
      }
    });

    return this._results;
  }
}

module.exports = Parser;
