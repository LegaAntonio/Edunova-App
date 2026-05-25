import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames, ZANROVI } from "../../constants"
import { Link, useNavigate } from "react-router-dom"
import AlbumService from "../../services/albumi/AlbumService"

export default function AlbumNovi() {

    const navigate = useNavigate()

    async function dodaj(album) {
        await AlbumService.dodaj(album).then(() => {
            navigate(RouteNames.ALBUMI)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({
            naziv: podaci.get('naziv'),
            izvodac: podaci.get('izvodac'),
            zanr: podaci.get('zanr'),
            godinaIzdanja: parseInt(podaci.get('godinaIzdanja')),
            brojPjesama: parseInt(podaci.get('brojPjesama')),
            aktivan: podaci.get('aktivan') === 'on'
        })
    }

    return (
        <>
            <h3>Unos novog albuma</h3>
            <Form onSubmit={odradiSubmit}>

                <Form.Group controlId="naziv" className="mb-3">
                    <Form.Label>Naziv albuma</Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>

                <Form.Group controlId="izvodac" className="mb-3">
                    <Form.Label>Izvođač</Form.Label>
                    <Form.Control type="text" name="izvodac" required />
                </Form.Group>

                <Row>
                    <Col md={4}>
                        <Form.Group controlId="zanr" className="mb-3">
                            <Form.Label>Žanr</Form.Label>
                            <Form.Select name="zanr">
                                {ZANROVI.map(z => <option key={z} value={z}>{z}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="godinaIzdanja" className="mb-3">
                            <Form.Label>Godina izdanja</Form.Label>
                            <Form.Control type="number" name="godinaIzdanja"
                                min={1900} max={2030} step={1} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="brojPjesama" className="mb-3">
                            <Form.Label>Broj pjesama</Form.Label>
                            <Form.Control type="number" name="brojPjesama"
                                min={1} step={1} />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="aktivan" className="mb-4">
                    <Form.Check label="Aktivan" name="aktivan" />
                </Form.Group>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.ALBUMI} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Dodaj album
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}
