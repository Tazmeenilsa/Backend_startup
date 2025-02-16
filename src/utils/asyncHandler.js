const asyncHandler = (requestHandler) => {
    // next is use for handle middlewares
   return (req, res, next) => { //wrapper function
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

export { asyncHandler }
// 2 methods 
// try catch and promise


// const asyncHandler = (fn) =>async(req, res, next) => {
//     try {
//         await fn(req, res, next) //wrapper function
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }