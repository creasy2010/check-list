/**
 * @desc
 *
 * @使用场景
 *
 * @Date    2019/3/27
 **/


/**
 * form.input => FormInput
 * form-input => FormInput
 * @param {string} name
 * @returns {any}
 */
export function toUCamelize(name: string) {
  return name
    .split(/[-\.]/)
    .map(item => {
      if(typeof (item) ==='string'){
        return item[0].toUpperCase() + item.substr(1);
      }else{
        throw new Error(`传入参数不正确:${name} ${item}`);
      }
    })
    .join('');
}

export function toLCamelize(name: string) {
  let camelName = this.toUCamelize(name);
  return camelName[0].toLowerCase() + camelName.substr(1);
}