const catchAsync = (controllerFunc) => {
    return function (req, res, next) {
        controllerFunc(req, res, next).catch(next);
    };
};
export default catchAsync;
