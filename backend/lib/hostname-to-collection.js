module.exports = function(hostname){
    return hostname
        .replace(/\./g, '_')
        .replace(/-/g, '_')
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, '')
        ;
};
