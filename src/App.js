import logo from './logo.svg';
import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import axios from 'axios';

class App extends React.Component {
  state = {
    cam: [],
    pedidos: [],
    clientes: [],
    vendedores: [],
    conta: 0,
    conta_p: 0,
    modalInsertar: false,
    form: {
      id: "",
      personaje: "",
      anime: "",
    },
    camionetaID: "",
    camionetaName: "",
    status:"entregado",
    fecha: new Date().toLocaleString()
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/camionetas`, {
      cors: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    })
      .then(res => {
        const cam = res.data;
        this.setState({ cam, conta: cam.length });

        //console.log(this.state.cam);
      })

    axios.get(`http://localhost:8080/pedidos`, {
      cors: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    })
      .then(res => {
        const pedidos = res.data;
        this.setState({ pedidos, conta_p: pedidos.length });

        console.log(this.state.pedidos);
      })
  }

  mostrarModalInsertar = (idCamioneta, hawa) => {
    axios.get(`http://localhost:8080/clientes`, {
      cors: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    })
      .then(res => {
        const clientes = res.data;
        this.setState({ clientes });

        console.log("clientes", this.state.clientes);
      })
    axios.get(`http://localhost:8080/vendedor`, {
      cors: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    })
      .then(res => {
        const vendedores = res.data;
        this.setState({ vendedores });

        console.log("vendedores", this.state.vendedores);
      })
    this.setState({
      modalInsertar: true,
      camionetaID: idCamioneta,
      camionetaName: hawa
    });
  };
  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  render() {

    return (
      <>

        <div class="container bg-light text-dark">
          <div className='row'>
            <div className='col-sm-6'>

              <h2 className='mt-4'>Listado de camionetas</h2>
              <p><span class="badge bg-primary position-relative">
                Unidades disponibles
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {this.state.conta}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </span></p>

              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Marca</th>
                    <th>HAWA</th>
                    <th>Precio de lista</th>
                    <th>Descuento</th>
                    <th>Existencia</th>
                    <th>Pedidos</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.cam.map((dato) => (
                    <tr key={dato.camionetaId}>
                      <td>{dato.marca}</td>
                      <td>{dato.hawa}</td>
                      <td>$ {dato.precioLista}</td>
                      <td>$ {dato.descuento}</td>
                      <td>{dato.existencia}</td>
                      <td>
                        <div>
                          {dato.existencia != 0 &&
                            <Button className='text-white m-2' color="success" onClick={() => this.mostrarModalInsertar(dato.camionetaId, dato.hawa)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                            </svg></Button>
                          }
                        </div>


                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='col-sm-6'>

              <h2 className='mt-4'>Pedidos</h2>
              <p><span class="badge bg-primary position-relative">
                Pedidos registrados
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {this.state.conta_p}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </span></p>

              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Cliente</th>
                    <th>Camioneta</th>
                    <th>Vendedor</th>
                    <th>Tienda</th>
                    <th>opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.pedidos.map((dato) => (
                    <tr key={dato.camionetaId}>
                      <td>{dato.fechaPedido.split('T')[0]}</td>
                      <td>{dato.status}</td>
                      <td>{dato.cliente.nombreC} {dato.cliente.appC}</td>
                      <td>{dato.camioneta.marca}-{dato.camioneta.hawa}</td>
                      <td>{dato.vendedor.nombre}</td>
                      <td>{dato.vendedor.tienda}</td>
                      <td>
                        <Button className='text-white m-2' color="success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                        </svg></Button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Generar pedido</h3></div>
          </ModalHeader>

          <ModalBody>
          <FormGroup>
              <label>
                Fecha pedido:
              </label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.fecha}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Status:
              </label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.status}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Camioneta:
              </label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.camionetaName}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Cliente:
              </label>
              <select
                id="idCliente"
                name="idCliente"
                className="form-control"
                onChange={this.handleChange}
              >
                {this.state.clientes.map((cl) => {
                  return (
                    <option key={cl.clienteId} value={cl.clienteId}>
                      {cl.nombreC}
                    </option>
                  );
                })}
              </select>
            
            </FormGroup>

            <FormGroup>
              <label>
                Vendedor:
              </label>
              <select
                id="idVendedor"
                name="idVendedor"
                className="form-control"
                onChange={this.handleChange}
              >
                {this.state.vendedores.map((cl) => {
                  return (
                    <option key={cl.vendedorId} value={cl.vendedorId}>
                      {cl.nombre}
                    </option>
                  );
                })}
              </select>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"

            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

      </>
    );
  }
}

export default App;
