import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Card from 'react-bootstrap/Card';
import "../style/home.css"
import Loading from "./Loading";
import { useNavigate, useParams } from "react-router-dom";
export default function Home() {
  const [data, setData] = useState([])
  useEffect(
    () => {
      fetch("http://localhost:8000/store")
        .then((data) => data.json())
        .then((data) => setData(data))
    }
    , [])
  const navigate = useNavigate()

  return (
    <div>
      {data.length === 0 ? <Loading /> : <div className="container-root">

        {data.map((val) => (

          <div>
            <div key={val._id} onClick={
              () => {
                navigate(`/toko/${val._id}`)
              }

            }>

              <div className="container1">
                <div className="TokoPosition">
                  <Card style={{ width: '25rem' }} className="Toko">
                    <Card.Img variant="top" src={val.img} className="gambarToko" />
                    <Card.Body>
                      <Card.Title>
                        {val.namaToko}
                      </Card.Title>
                      <Card.Text>
                        {val.kota}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>}
    </div>
  );
}