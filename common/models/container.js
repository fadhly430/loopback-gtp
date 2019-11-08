module.exports = function(container) {

    container.getContainerByName= function(CONTAINER, callback){
        new Promise (function(resolve, reject){
            //find by name
        container.find({where:{Name:{like: CONTAINER}}}, function(err, result){
            if(err) reject(err);
            if (result== null){
                err = new Error('Maaf tidak ditemukan');
                err.statusCode=404;
                reject(err);
            }
            resolve(result);
        });
        }).then(function(res){
            if (!res) callback(err);
            return callback(null, res[0]);     
        }).catch(function(err){
            callback(err);
        });
    };
    container.remoteMethod(
        'getContainer',{
        description : 'get user by name',
        accepts: [
            {arg : 'name', type : 'string'}
        ],
        returns : {
            arg : 'res', type: 'object', root: true
        },
        http:{path: '/getContainerByName', verb: 'get'},
    }
);
};
