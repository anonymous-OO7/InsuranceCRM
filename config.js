let config = {};

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
} else if (process.env.NODE_ENV === 'development') {
  console.log('HERE IN CONFIG');
} else {
  console.log('else block of production');
}

export default config;
