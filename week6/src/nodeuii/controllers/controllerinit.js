import indexController from './indexController'

const controllInit = {
    init (app , router ){
        app.use(router(_ => {
            _.get('/', indexController.indexAction())
        
          }))
    }
}

export default controllInit