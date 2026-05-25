import { useEffect, useState } from "react"
import AlbumService from "../../services/albumi/AlbumService"
import { Button, Table } from "react-bootstrap"
import { GrValidate } from "react-icons/gr"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"

export default function AlbumiPregled() {

    const navigate = useNavigate()
    const [albumi, setAlbumi] = useState([])

    useEffect(() => {
        ucitajAlbume()
    }, [])

    async function ucitajAlbume() {
        await AlbumService.get().then((odgovor) => {
            setAlbumi(odgovor.data)
        })
    }

    async function obrisi(sifra) {
        if (!confirm('Sigurno obrisati album?')) {
            return
        }
        await AlbumService.obrisi(sifra)
        ucitajAlbume()
    }

    return (
        <>
            <Link to={RouteNames.ALBUMI_NOVI}
                className="btn btn-success w-100 my-3">
                Dodavanje novog albuma
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Izvođač</th>
                        <th>Žanr</th>
                        <th>Godina izdanja</th>
                        <th>Broj pjesama</th>
                        <th>Aktivan</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {albumi && albumi.map((album) => (
                        <tr key={album.sifra}>
                            <td className="lead">{album.naziv}</td>
                            <td>{album.izvodac}</td>
                            <td>{album.zanr}</td>
                            <td className="text-end">{album.godinaIzdanja}</td>
                            <td className="text-end">{album.brojPjesama}</td>
                            <td style={{ textAlign: 'center' }}>
                                <GrValidate
                                    size={25}
                                    color={album.aktivan ? 'green' : 'red'}
                                />
                            </td>
                            <td>
                                <Button onClick={() => { navigate(`/albumi/${album.sifra}`) }}>
                                    Promjeni
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger" onClick={() => { obrisi(album.sifra) }}>
                                    Obriši
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
