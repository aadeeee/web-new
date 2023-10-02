import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../style/Kategori.css';
export default function Kategori() {
    const [kategori, setKategori] = useState([])
    function mapData(data) {
        console.log(data)
        let mapping = {}
        for (let i = 0; i < data.length; i++) {
            let category = data[i].kategori
            if (!mapping[category]) {
                mapping[category] = {
                    kategori: category,
                    productInCategory: [
                        {
                            idProduk: data[i]._id,
                            idToko: data[i].idToko,
                            namaProduk: data[i].namaProduk,
                        }
                    ]

                }
            }
            else {
                mapping[category]["productInCategory"].push({
                    idProduk: data[i]._id,
                    idToko: data[i].idToko,
                    namaProduk: data[i].namaProduk
                })
            }
        }
        let keys = Object.keys(mapping)
        let dataState = []
        for (let i = 0; i < keys.length; i++) {
            dataState.push(mapping[keys[i]])
        }
        setKategori(dataState)
    }
    useEffect(() => {
        fetch("http://localhost:8000/produk")
            .then((data) => data.json())
            .then((data) => {
                mapData(data)
            })
    }, [])
    console.log(kategori)
    return (
        <>
            {kategori.map((val) => (
                <Card>
                    <Card.Body>
                        <div>
                            <Accordion defaultActiveKey="0" flush>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header className="bgKategori">
                                        <div className='kelompok'>
                                            {val.kategori}
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <Container>
                                                <Row className="justify-content-md-center">
                                                    <Col xs lg="2">
                                                        <div>
                                                            <li>
                                                                {val.productInCategory.map((value) => (
                                                                    <a className="jarak" href={`/toko/${value.idToko}/${value.idProduk}`}>{value.namaProduk}<br/></a>
                                                                ))}
                                                            </li>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>

                            </Accordion>
                        </div>
                    </Card.Body>
                </Card>

            ))}
        </>
    )
}