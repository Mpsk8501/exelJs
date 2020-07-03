import './scss/index.scss'

console.log('dddd')
async function start() {
  return await Promise.resolve('async test')
}

start().then(console.log)