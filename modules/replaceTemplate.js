// 1. This is the function that taks the template and an object with all the valid values. Then overrides the old static values to the new values from the object.. 

module.exports = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName); //g for the global and all the elems are replaced here not only the first one
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if (! product.organic) {output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');}

    return output;
}