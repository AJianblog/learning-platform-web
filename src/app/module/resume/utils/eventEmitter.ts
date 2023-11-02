export class EventEmitter {

  callback: any;

  constructor() {
    this.callback = {};
    this.callback.base = {}
  }

  on(names: string, callback: Function) {
    if (names === '') {
      console.warn('name名称错误，不能为空字符串');
      return this;
    }
    const resolveNames: string[] = this.resolveNames(names)
    let name = this.resolveName(resolveNames[0])
    return this;
  }

  resolveNames(names: string) {
    let backNames = names
    backNames = backNames.replace(/[^a-zA-Z0-9 ,/.]/g, '');
    backNames = backNames.replace(/[,/]+/g, ' ');
    return backNames.split(' ')
  }

  resolveName(name: string) {
    const parts = name.split('.')
    const newName = {
      original: name,
      value: parts[0],
      namespace: 'base'
    };
    if (parts.length > 1 && parts[1] !== '') {
      newName.namespace = parts[1];
    }
    return newName;
  }
}
