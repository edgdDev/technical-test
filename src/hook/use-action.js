import { useState } from "react"
import { toast } from "react-toastify"

const initialStore = {
    client: {
        id: null,
        name: '',
        lastName: '',
        phone: '',
        address: []
    },
    action: 0,
    showCard: false,
}

const initialListClient = {
    listClient: [],
    auxListClient: []
}

export const useActions = () => {

    const [store, setStore] = useState( initialStore )
    const [listClient, setNewList] = useState( initialListClient )

    const handleInputs = ({ key, value }) => setStore(e => ({ ...e, client: { ...e.client, [key]: value } }))

    const onAddAddress = (address) => setStore(e => ({ ...e, client: { ...e.client, address: [ ...e.client.address, address ] } }))

    const onSave = (event) => {

        event.preventDefault()

        if( store.client.name.length < 1 || store.client.lastName.length < 1 || store.client.phone.length < 1 || store.client.address.length === 0 ) {
            return toast.error('¡Todos los campos son requeridos!')
        }
        //Validamos si es nuevo el cliente
        if( store.client.id !== null ) {
            
            const newList = listClient.listClient.map(e => {
                if( e.id === store.client.id ) {
                    return store.client
                }
                return e
            })
            setNewList(e => ({ ...e, listClient: newList }))
            setStore( initialStore )
            return
        }

        const payload = { ...store.client, id: listClient.listClient.length }
        setNewList(e => ({ ...e, listClient: [ ...e.listClient, payload ] }))
        setStore(e => ({ ...e, client: initialStore.client }))

    }

    const onEditClient = (client) => setStore(e => ({ ...e, client: client }))

    const onToggleCard = () => setStore(e => ({ ...e, showCard: !e.showCard }))

    const onSetAction = ( value ) => setStore(e => ({ ...e, action: value }))

    const onCancelForm = () => setStore( initialStore )

    const onDropClient = (id) => {
        const newList = listClient.listClient.filter(e => e.id !== id)
        setNewList(e => ({ ...e, listClient: newList }))
    }

    const onDropAddress = (address) => {
        const newList = store.client.address.filter(e => e !== address)
        setStore(e => ({ ...e, client: { ...e.client, address: newList } }))
    }

    const onSearchClient = (value) => {
        if( listClient.auxListClient.length === 0 ) setNewList(e => ({ ...e, auxListClient: listClient.listClient }))
        const newList = listClient.listClient.filter(e => e.name.toLowerCase().includes( value.toLowerCase() ) || e.lastName.toLowerCase().includes( value.toLowerCase() ))
        setNewList(e => ({ ...e, listClient: newList }))
        if( value.length === 0 ) setNewList(e => ({ listClient: e.auxListClient, auxListClient: [] }))
    }

    return [
        { store, listClient }, 
        { handleInputs, onSave, onToggleCard, onSetAction, onAddAddress, onCancelForm, onDropClient, onDropAddress, onEditClient, onSearchClient }
    ]

}