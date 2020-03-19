import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions from redux
import { addNewProductAction } from "../actions/productActions";
import { showAlert, hideAlert } from "../actions/alertActions";

const NewProduct = ({ history }) => {
  // Use Dispatch
  let path = "";
  const dispatch = useDispatch();

  const addProduct = (product, path) =>
    dispatch(addNewProductAction(product, path));

  // State Store
  const loading = useSelector(state => state.products.loading);
  const alerts = useSelector(state => state.alert.alert);

  // State component
  const [product, setProduct] = useState({
    name: "",
    price: ""
  });

  const { name, price } = product;

  // submit
  const submitNewProduct = e => {
    e.preventDefault();

    // Form validation
    if (name.trim() === "" || price <= 0) {
      const alert = {
        msg: "Ambos campos son obligatorios",
        style: "alert alert-danger text-center text-uppercase p3"
      };
      dispatch(showAlert(alert));
      return;
    }

    // Create new product
    addProduct(product, path).then(answer => {
      history.push(answer);
    });
    dispatch(hideAlert());
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            {alerts ? <p className={alerts.style}>{alerts.msg}</p> : null}
            <form onSubmit={submitNewProduct}>
              <div className="form-group">
                <label>Nombre del Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del Producto"
                  name="name"
                  value={product.name}
                  onChange={e =>
                    setProduct({
                      ...product,
                      [e.target.name]: e.target.value
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Precio del Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio del Producto"
                  name="price"
                  value={product.price}
                  onChange={e =>
                    setProduct({
                      ...product,
                      [e.target.name]: Number(e.target.value)
                    })
                  }
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {loading ? (
              <p className="alert alert-danger mt-4 text-center">
                Cargando....
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
