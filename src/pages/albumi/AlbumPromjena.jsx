import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import AlbumService from "../../services/albumi/AlbumService"
import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames, ZANROVI } from "../../constants"

export default function AlbumPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [album, setAlbum] = useState({})
    const [aktivan, setAktivan] = useState(false)

    useEffect(() => {
        ucitajAlbum()
    }, [])

    async function ucitajAlbum() {
        await AlbumService.getBySifra(params.sifra).then((odgovor) => {
            setAlbum(odgovor.data)
            setAktivan(odgovor.data.aktivan)
        })
    }

    async function promjeni(album) {
        await AlbumService.promjeni(params.sifra, album).then(() => {
            navigate(RouteNames.ALBUMI)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        promjeni({
            naziv: podaci.get('naziv'),
            izvodac: podaci.get('izvodac'),
            zanr: podaci.get('zanr'),
            godinaIzdanja: parseInt(podaci.get('godinaIzdanja')),
            brojPjesama: parseInt(podaci.get('brojPjesama')),
            aktivan: aktivan
        })
    }

    return (
        <>
            <h3>Promjena albuma</h3>
            <Form onSubmit={odradiSubmit}>

                <Form.Group controlId="naziv" className="mb-3">
                    <Form.Label>Naziv albuma</Form.Label>
                    <Form.Control type="text" name="naziv" required
                        defaultValue={album.naziv} />
                </Form.Group>

                <Form.Group controlId="izvodac" className="mb-3">
                    <Form.Label>Izvođač</Form.Label>
                    <Form.Control type="text" name="izvodac" required
                        defaultValue={album.izvodac} />
                </Form.Group>

                <Row>
                    <Col md={4}>
                        <Form.Group controlId="zanr" className="mb-3">
                            <Form.Label>Žanr</Form.Label>
                            <Form.Select name="zanr"
                                value={album.zanr || ''}
                                onChange={(e) => setAlbum({ ...album, zanr: e.target.value })}>
                                {ZANROVI.map(z => <option key={z} value={z}>{z}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="godinaIzdanja" className="mb-3">
                            <Form.Label>Godina izdanja</Form.Label>
                            <Form.Control type="number" name="godinaIzdanja"
                                min={1900} max={2030} step={1}
                                defaultValue={album.godinaIzdanja} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="brojPjesama" className="mb-3">
                            <Form.Label>Broj pjesama</Form.Label>
                            <Form.Control type="number" name="brojPjesama"
                                min={1} step={1}
                                defaultValue={album.brojPjesama} />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="aktivan" className="mb-4">
                    <Form.Check label="Aktivan" name="aktivan"
                        checked={aktivan}
                        onChange={(e) => { setAktivan(e.target.checked) }} />
                </Form.Group>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.ALBUMI} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Promjeni album
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}
