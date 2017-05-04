export default class MultipliersHandler {
  /**
   *
   * @param multipliers
   */
  constructor(multipliers) {
    this._multipliers = multipliers;
    this.counter = multipliers.length;
  }

  /**
   *
   * @returns {*}
   */
  get multipliers() {
    return this._multipliers;
  }

  /**
   *
   * @param multipliers
   */
  set multipliers(multipliers) {
    this._multipliers = multipliers;
  }

  /**
   *
   * @param index
   * @returns {*}
   */
  getMultiplier(index) {
    return this._multipliers[index];
  }

  /**
   *
   * @param resolution
   * @param multiplier
   * @returns {MultipliersHandler}
   */
  addMultiplier(resolution, multiplier) {
    this._multipliers.push(
      {
        id: this.counter,
        name: resolution,
        value: multiplier,
      }
    );
    this.counter++;
    this._sortMultipliers();
    return this;
  }

  /**
   *
   * @param index
   * @returns {MultipliersHandler}
   */
  deleteMultiplier(index) {
    this._multipliers.splice(index, 1);
    return this;
  }

  /**
   *
   * @param index
   * @param resolution
   * @returns {MultipliersHandler}
   */
  updateResolution(index, resolution) {
    this._multipliers[index].name = resolution;
    return this;
  }

  /**
   *
   * @param index
   * @param multiplier
   * @returns {MultipliersHandler}
   */
  updateMultiplier(index, multiplier) {
    this._multipliers[index].value = multiplier;
    this._sortMultipliers();
    return this;
  }

  /**
   *
   * @private
   */
  _sortMultipliers() {
    this._multipliers.sort((a,b)=>{
      return parseInt(a.value) - parseInt(b.value);
    });
  }
}
