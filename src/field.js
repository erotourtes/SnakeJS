class Field {
    map = new Array(10).fill(null).map(() => new Array(10).fill(0));

    generate() {
        console.log('Map generated');
        console.log(this.map);
    }
}

export default Field;
