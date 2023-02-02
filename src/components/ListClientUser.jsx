import { Button, Card, CardBody, CardHeader, Col, Input, Table } from "reactstrap"

const ListClientUser = ({ actions, listClient, showCard }) => {

  const { onToggleCard, onSetAction, onDropClient, onEditClient, onSearchClient } = actions

  return (
    <Col lg={ 8 } md={ 8 } sm={ 12 }>
        <Card>
            <CardHeader> 
                <h5>Lista de Clientes </h5>
            </CardHeader>
            <CardBody>
                <div className="d-flex">
                    <Input 
                        type="text"
                        placeholder="Buscar Cliente"
                        className="w-50 me-2"
                        onChange={({ target }) => onSearchClient( target.value )}
                    />
                    <Button 
                        color="primary"
                        onClick={ () => {
                            onSetAction( 1 )
                            onToggleCard() 
                        }}
                        disabled={ showCard }
                    > 
                        Adicionar Cliente 
                    </Button>
                </div>
                <Table className="mt-2">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Teléfono</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listClient.map(e => (
                                <tr key={ e.id }>
                                    <td>{ e.id+1 }</td>
                                    <td> { e.name } </td>
                                    <td> { e.lastName } </td>
                                    <td> { e.phone } </td>
                                    <td>
                                        <Button 
                                            color='warning'
                                            size="sm"
                                            disabled={ showCard }
                                            onClick={() => {
                                                onSetAction( 2 )
                                                onToggleCard()
                                                onEditClient( e ) 
                                            }}
                                        > 
                                            Ver detalle 
                                        </Button>
                                        <Button 
                                            color="danger" 
                                            size="sm" 
                                            className="ms-2"
                                            disabled={ showCard }
                                            onClick={ () => onDropClient( e.id ) }
                                        >
                                            Borrar
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    </Col>
  )
}

export default ListClientUser