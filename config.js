exports.DATABASE_URL = process.env.DATABASE_URL || 
                        global.DATABASE_URL || 
                        (process.env.NODE_ENV == 'production' ?
                        'mongodb://diya:123@ds049436.mlab.com:49436/mongo-shopping-list':
                            'mongodb://localhost/shopping-list-dev');
                            
exports.PORT = process.env.PORT || 8080;

                        

