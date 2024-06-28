import "./OrderDetailsProduct.css"
function OrderDetailsProduct(){
    return (
        <div className="order-details-product d-flex flex-row">
            <div className="order-details-product-img d-flex">
                <img src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"/>                
            </div>
            <div className="order-details-product-data d-flex flex-column">
                <div>Mens Casual Premium Slim Fit T-Shirts </div>
                <div>22.3</div>
            </div>
            <div class="order-details-product-actions d-flex flex-column"><div class="order-details-product-quantity"><div class="fw-bold">Quantity</div><div class="form-group"><select class="form-select"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></div></div><button class="order-details-product-remove btn btn-danger">Remove</button></div>
           
        </div>
    )
}

export default OrderDetailsProduct;