'use strict';

module.exports = function(Formdompet) {

    Formdompet.getFormName = function(name, callback){
        new Promise(function(resolve, reject){
            // FIND NAME
            Formdompet.find({where : {nama : {like : name}}}, function(err, result){
                if(err) reject (err);
                if(result === null){
                    err = new Error("user not found");
                    err.statusCode = 404;
                    reject(err)
                }
                resolve(result);
            });
        }).then(function(res){
            if(!res) callback(err);
            return callback(null, res[0]);
        }).catch(function(err){
            callback(err);
        });
    };

    Formdompet.remoteMethod(
        'getFormdompetName',
        {
            description: 'get user by name',
            accepts: [{
                 arg: 'name', type: 'string'}
        ],
        returns: {
            arg: 'res', type: 'object', root:true
        },
        http: {path: '/getFormdompetByName', verb: 'get'}
        }
    );

};
