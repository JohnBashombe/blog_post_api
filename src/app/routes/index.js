import userRoute from "./auth";

class Routing {

    static run(app) {
        app.use(userRoute);
        
        app.get('/', (req, res) => {
            res.send('Hello world');
        });

        app.use('*', (req, res) => {
            res.send('Route not found');
        });
    }
}

export default Routing;
