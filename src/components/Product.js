import React from 'react';
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

//Redux
import { useDispatch } from "react-redux";
import { deleteProductAction, editProducIdtAction } from "../actions/productActions";

const Product = ({ product }) => {
    const { name, price, id } = product

    const dispatch = useDispatch()
    const history = useHistory()

    const confirmDelete = id => {

        //ask the user
        Swal.fire({
            title: 'Estas segur@ ?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#78C2AD',
            cancelButtonColor: '#FF7851',
            confirmButtonText: 'Sí, bórralo!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                // pass it to action
                dispatch(deleteProductAction(id))
            }
        })
    }

    //redirect to edition
    const redirectEdition = product => {
        dispatch(editProducIdtAction(product))
        history.push(`/products/edit/${product.id}`)
    }

    return (
        <tr>
            <td>{name}</td>
            <td><span className="font-weight-bold"> $ {price}  </span></td>
            <td className="acciones">
                <button
                    type="button"
                    onClick={() => redirectEdition(product)}
                    className="btn btn-primary mr-2"
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmDelete(id)}
                > Eliminar</button>
            </td>
        </tr>
    );
}

export default Product;