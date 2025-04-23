function wrapAsync(fn){  //alternative of try catch
    return function(req,res,next){
        fn(req,res,next).catch(next);
    }
}
module.exports = wrapAsync;