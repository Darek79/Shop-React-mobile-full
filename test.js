
const arr = ['admin'];

const fn=([...args])=>{
  return [...args]
};



const res = ['admin','employee'].filter(u=>fn(['admin']).includes(u));

console.log(res);