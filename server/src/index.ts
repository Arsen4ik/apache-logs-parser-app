import app from './server'

const PORT = 5678

app.listen(PORT, () => console.log(`hello on localhost ${PORT}`))