import EventEmitter from './EventEmitter'

const _emitter = new EventEmitter()
_emitter.setMaxListeners(0)

export const emitter = _emitter
