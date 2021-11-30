
const proxy = [
    {
        context: '/api',
        target: 'http://localhost:3000',
        pathRewrite: {'^/api':''}
    }
];

module.exports = proxy;