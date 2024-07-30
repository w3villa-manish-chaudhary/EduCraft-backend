const hello = async (req, res, next) => {
    console.log("hello i am home page:::::>>>>>");   
    res.send("<h1>Hello! this is a home page.</h1>");
}

module.exports = hello;

