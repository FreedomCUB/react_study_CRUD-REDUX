import React, { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { editProductAction } from "../actions/productActions";

const EditProduct = ({history}) => {
  const dispatch = useDispatch();

  // new estate 
  const [productstate, setProductstate] = useState({
      name: "",
      price: ""
  })
  const product = useSelector(state => state.products.productEdit);
  

  useEffect(() => {
    setProductstate(product)
  }, [product]
  )

  const onChangeForm = e => {
      setProductstate({
        ...productstate,
        [e.target.name]: e.target.value        
      })
  }
  if (!product) {
      history.push('/')      
  }
  

  const submitEditProduct = e => {
    e.preventDefault();

    dispatch(editProductAction(productstate))
    
    history.push('/')
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>
            <form onSubmit={submitEditProduct}>
              <div className="form-group">
                <label>Nombre del Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del Producto"
                  name="name"
                  value={productstate ? productstate.name : ""}
                  onChange={onChangeForm}
                />
              </div>
              <div className="form-group">
                <label>Precio del Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio del Producto"
                  name="price"
                  value={ productstate ? productstate.price : ""}
                  onChange={onChangeForm}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
