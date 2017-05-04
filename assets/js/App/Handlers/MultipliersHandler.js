export default class MultipliersHandler {
  constructor(multipliers) {
    this._multipliers = multipliers;
    this.counter = multipliers.length;
  }

  get multipliers() {
    return this._multipliers;
  }

  set multipliers(multipliers) {
    this._multipliers = multipliers;
  }

  getMultiplier(index) {
    return this._multipliers[index];
  }

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

  deleteMultiplier(index) {
    this._multipliers.splice(index, 1);
    return this;
  }

  updateResolution(index, resolution) {
    this._multipliers[index].name = resolution;
    return this;
  }

  updateMultiplier(index, multiplier) {
    this._multipliers[index].value = multiplier;
    this._sortMultipliers();
    return this;
  }

  _sortMultipliers() {
    this._multipliers.sort((a,b)=>{
      return parseInt(a.value) - parseInt(b.value);
    });
  }
}
