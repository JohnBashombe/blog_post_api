import app, { PORT } from './app/app';

app.listen(PORT, () => {
    process.stdout.write(`app is running on port ${PORT}`);
});
