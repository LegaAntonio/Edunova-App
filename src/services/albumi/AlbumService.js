import { albumi } from './AlbumPodaci'

// 1/4 Read od CRUD
async function get() {
    return { data: [...albumi] }
}

async function getBySifra(sifra) {
    return { data: albumi.find(a => a.sifra === parseInt(sifra)) }
}

// 2/4 Create od CRUD
async function dodaj(album) {
    if (albumi.length === 0) {
        album.sifra = 1
    } else {
        album.sifra = albumi[albumi.length - 1].sifra + 1
    }
    albumi.push(album)
}

// 3/4 Update od CRUD
async function promjeni(sifra, album) {
    const index = nadiIndex(sifra)
    albumi[index] = { ...albumi[index], ...album }
}

function nadiIndex(sifra) {
    return albumi.findIndex(a => a.sifra === parseInt(sifra))
}

// 4/4 Delete od CRUD
async function obrisi(sifra) {
    const index = nadiIndex(sifra)
    albumi.splice(index, 1)
}

export default {
    get,
    getBySifra,
    dodaj,
    promjeni,
    obrisi
}
