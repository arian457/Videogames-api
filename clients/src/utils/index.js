export const  toJadenCase = (e) => {
    return e.replace(/(^|\s)[a-z]/g, function(x){ return x.toUpperCase(); });
  };