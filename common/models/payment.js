'use strict';

module.exports = function(Payment) {

    Payment.getPaymentName = function(name, callback){
        new Promise(function(resolve, reject){
            // FIND NAME
            Payment.find({where : {nama : {like : name}}}, function(err, result){
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

    Payment.remoteMethod(
        'getPaymentName',
        {
            description: 'get user by name',
            accepts: [{
                 arg: 'name', type: 'string'}
        ],
        returns: {
            arg: 'res', type: 'object', root:true
        },
        http: {path: '/getPaymentByName', verb: 'get'}
        }
    );

};
