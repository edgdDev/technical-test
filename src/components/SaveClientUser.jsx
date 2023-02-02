import { useState } from "react"
import { toast } from "react-toastify"
import { Button, Card, CardBody, CardHeader, Col, Form, Input, Label, Row, Table } from "reactstrap"


const SaveClientUser = ({ action, handleInputs, client, onAddAddress, onCancelForm, onSave, onDropAddress }) => {

  const [address, setAddress] = useState('')  

  return (
    
        <Col lg={ 4 } md={ 4 } sm={ 12 }>
            <Card>
                <CardHeader> 
                    <h5> { `${action === 1? 'Creando nuevo' : 'Editando'} Cliente` } </h5>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={ onSave }>
                        <Row>
                            <Col lg={ 6 } md={ 12 }>
                                <Label> Nombre </Label>
                                <Input 
                                    type='text'
                                    name='name'
                                    value={ client.name }
                                    onChange={ ({ target }) => handleInputs({ key: target.name, value: target.value }) }
                                />
                            </Col>
                            <Col lg={ 6 } md={ 12 }>
                                <Label> Apellido </Label>
                                <Input 
                                    type='text'
                                    name='lastName'
                                    value={ client.lastName }
                                    onChange={ ({ target }) => handleInputs({ key: target.name, value: target.value }) }
                                />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col lg={ 6 } md={ 6 }>
                                <Label> Teléfono </Label>
                                <Input 
                                    type='text'
                                    name='phone'
                                    value={ client.phone }
                                    onChange={ ({ target }) => handleInputs({ key: target.name, value: target.value }) }
                                />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col lg={ 12 } md={ 12 }>
                                <div className="d-flex w-100">
                                    <Input 
                                        type='text'
                                        name='address'
                                        className="w-50 me-2"
                                        placeholder="Digitar la dirección"
                                        value={ address }
                                        onChange={ ({ target }) => setAddress( target.value ) }
                                    />
                                    <Button
                                        color='primary'
                                        onClick={ () => {
                                            if( address.length === 0 ) return toast.error('¡Debe colocar una dirección!')
                                            onAddAddress( address )
                                            setAddress('')
                                        } }
                                    >
                                        Agregar
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        {
                            client.address.length > 0 &&
                            <Row className="mt-2">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Dirección</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { client.address.map((e,i) => (
                                            <tr key={ i }>
                                                <td>{ i+1 }</td>
                                                <td>{ e }</td>
                                                <td> 
                                                    <Button 
                                                        color="danger"
                                                        onClick={ () => onDropAddress( e ) }
                                                        size='sm'
                                                    > 
                                                        Borrar 
                                                    </Button> 
                                                </td>
                                            </tr>
                                        )) }
                                    </tbody>
                                </Table>
                            </Row>
                        }
                        <Row className="mt-3">
                            <div className="d-flex">
                                <div>
                                    <Button
                                        color="success"
                                        type="submit"
                                    >
                                        Guardar
                                    </Button>
                                </div>
                                <div className="ms-2">
                                    <Button
                                        color="danger"
                                        onClick={ onCancelForm }
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </div>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </Col>

  )
}

export default SaveClientUser