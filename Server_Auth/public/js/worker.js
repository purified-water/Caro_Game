self.addEventListener('message', (event) => {
    console.log('Worker received message: ', event.data);
});