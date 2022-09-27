let db = JSON.parse(localStorage.getItem("db"))


// let db = [{
//     imagen: 'happybirthday',
//     titulo: 'Happybirthday',
//     descripcion: 'Letrero de neon led happy birthday cursiva todo',
//     sizes: [
//         { size: '80x50', price: '100' },
//         { size: '110x60', price: '130' },
//     ],
//     tags: ['Fiestas', 'Cumpleaños', 'Eventos', 'Alquiler'],
// }]
console.log(db)

let currentIndexDb = 0

const htmlDivs =
`
<div class="prices">
<div class="">
    <span>Size</span>
    <input type="text" name="size" id="size" placeholder="tamaño">
</div>
<div class="">
    <span>Precio</span>
    <input type="number" name="price" id="precio" placeholder="$$">
</div>
</div>    
`

const form = document.getElementById('formulario')
const img = document.getElementById('imagen')

const btnBack = form.btnBack
const btnNext = form.btnNext
let filename

document.getElementById('btnUpload').addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        filename = e.target.files[0].name
        console.log(filename)
        // db[currentIndexDb].imagen = filename
        const src = URL.createObjectURL(e.target.files[0])
        img.src = src
    }

    // e.preventDefault()
    // e.stopPropagation()
})

btnBack.addEventListener('click', (e) => {
    form.reset()
    if (!db[currentIndexDb]){

        db.push({
            imagen: '',
            titulo: '',
            descripcion: '',
            sizes: [
                { size: '', price: '' },
            ],
            tags: ['Fiestas', 'Cumpleaños', 'Eventos', 'Alquiler'],
        })
    }
    document.getElementById('pricesBxBx').innerHTML = htmlDivs    
    currentIndexDb--
    currentIndexDb = currentIndexDb < 1 ? 0 : currentIndexDb
    console.log(currentIndexDb)
    render()
    e.stopPropagation()
    e.preventDefault()
})

btnNext.addEventListener('click', (e) => {
    form.reset()
    document.getElementById('pricesBxBx').innerHTML = htmlDivs    
    if (db[currentIndexDb].titulo) currentIndexDb++
    // currentIndexDb = currentIndexDb <= db.length ? currentIndexDb + 1 : currentIndexDb
    if (!db[currentIndexDb]){

        db.push({
            imagen: '',
            titulo: '',
            descripcion: '',
            sizes: [
                { size: '', price: '' },
            ],
            tags: ['Fiestas', 'Cumpleaños', 'Eventos', 'Alquiler'],
        })
    }
    console.log('currentIndexDb', currentIndexDb)
    console.log('db lenght', db.length)
    if (db[currentIndexDb].titulo && db[currentIndexDb].tags)
        render()
    console.log('db: ', db)
    e.stopPropagation()
    e.preventDefault()
})

function render() {

    form.title.value = db[currentIndexDb].titulo
    form.description.value = db[currentIndexDb].descripcion

    document.getElementById('imagename').innerHTML = db[currentIndexDb].imagen

    console.log(db[currentIndexDb].sizes)

    db[currentIndexDb].tags.map(tag => {
        form.tags.value += tag+','
    })

    let htmlSizes = ''
    db[currentIndexDb].sizes.map(item => {
        htmlSizes +=
            `
        <div class="prices">
            <div class="">
                <span>Size</span>
                <input type="text" name="size" id="size" placeholder="tamaño" value=${item.size}>
            </div>
            <div class="">
                <span>Precio</span>
                <input type="number" name="price" id="precio" placeholder="$$" value=${item.price}>
            </div>
        </div>    

        `
    })

    document.getElementById('pricesBxBx').innerHTML = htmlSizes

}

function addSizesDb() {
    if (!form.price.length && !form.size.length) {
        db[currentIndexDb]["sizes"][0]["price"] = form.price.value
        db[currentIndexDb]["sizes"][0]["size"] = form.size.value
    }
    if (db[currentIndexDb].sizes.length <= form.price.length) {
        db[currentIndexDb].sizes.push({ size: '', price: '' })
    }

    if (form.price.length > 1) {
        for (let i = 0; i < form.price.length; i++) {
            db[currentIndexDb]["sizes"][i]["price"] = form.price[i].value
            db[currentIndexDb]["sizes"][i]["size"] = form.size[i].value
        }
    }
    console.log(db[currentIndexDb].sizes)
}


const precioInput = document.getElementById('precio')

document.getElementById('btnAdd').addEventListener('click', e => {


    let htmlpricesBxBx = document.getElementById('pricesBxBx')

    htmlpricesBxBx.innerHTML += htmlDivs

    addSizesDb()
    // render()
    e.preventDefault()
    e.stopPropagation()
})

document.getElementById('btnSave').addEventListener('click', (e) => {
    e.preventDefault()
    if (!form.price.length && !form.size.length) {
        db[currentIndexDb]["sizes"][0]["price"] = form.price.value
        db[currentIndexDb]["sizes"][0]["size"] = form.size.value
    }
    for (let i = 0; i < form.price.length; i++) {
        db[currentIndexDb].sizes[i].price = form.price[i].value
        db[currentIndexDb].sizes[i].size = form.size[i].value
    }
    // console.log(db[currentIndexDb])
    db[currentIndexDb]["imagen"] = filename
    db[currentIndexDb]["titulo"] = form.title.value
    db[currentIndexDb]["descripcion"] = form.description.value
    db[currentIndexDb]["tags"] = []
    const tagsArr = form.tags.value.split(',')
    // console.log(tagsArr)
    db[currentIndexDb].tags = tagsArr


    localStorage.setItem("db", JSON.stringify(db))
    alert('Datos guardados correctamente')
    e.stopPropagation()
})
