// dữ liệu của sản phẩm #####
const url_products ="https://61c16f3d9dbcca0017c81ed3.mockapi.io/api/Products";

// hàm show sản phẩm ra 
//  hàm mở các section #########
// home
function open__section_home(){
    document.getElementById('home').style.display="block"
    remove__view_product();
    close__section_product()
}
function close__section_home(){
    document.getElementById('home').style.display="none"
    open__section_product();
}
// view product
function open__section_product(){
    document.getElementById('view_products').style.display="block"
}
function close__section_product(){
    document.getElementById('view_products').style.display="none"
}

// 
show_products();
function show_products(){
    axios.get(url_products)
        .then((res) => {
            var proArr = res.data;
            for(var pro of proArr){
                if(pro.type.for == "decor"){
                    document.getElementById('home__products_decor').innerHTML+=`
                    <div class="img img${pro.id}" onclick="viewProduct(${pro.id})">
                        <img src="${pro.image}" alt="">
                    </div>
                `;
                }else if(pro.type.for == "kitchen"){
                    document.getElementById('home__products_kitchen').innerHTML+=`
                    <div class="img img${pro.id}" onclick="viewProduct(${pro.id})">
                        <img src="${pro.image}" alt="">
                    </div>
                `;
                }else{
                    document.getElementById('home__products_bedroom').innerHTML+=`
                    <div class="img img${pro.id}" onclick="viewProduct(${pro.id})">
                        <img src="${pro.image}" alt="">
                    </div>
                `;
                }
            }
        })
}
// lay id
function getData(id){
    return axios(url_products+ "/"+ id)
}
// view product khi click vao'

function viewProduct(id){
    getData(id)
    .then((res) =>{
        var pro = res.data;
        document.getElementById('view_products').innerHTML+=`
        <div class="view_product" id="view_product">
        <div class="view_img">
        <div id="view_img${pro.id}">
            <img class="imgzoom" src="${pro.image}" alt="">
        </div>
        <div class="infor_pro"id="infor_pro${pro.id}">
            <p>${pro.infor}</p>
        </div>
    </div>
    <div class="view_infor">
        <div id="view__pro-name">
            <h1>${pro.name}</h1>
            <p id="view__pro-sku">SKU:000$${pro.id}</p>
        </div>
        <div id="view__pro-price">
            <p>$${pro.price}</p>
        </div>
        <div id="view__pro-color">
            <p>Color:${pro.type.color}</p>
        </div>
        <div>
            <label class="list-img-color">
                <input type="radio" name="radio">
                <span class="check__color-pro" id="view__pro-check" style="background-color: ${pro.type.color};"></span>
              </label>
        </div>
        <div id="quantity_pro">
            <p>Quantity</p>
            <input type="number" id="quantity" min="1" max="100" value="1">
        </div>
        <button type="button" class="btn_atc" onclick="add_to_cart(${pro.id})">Add to Cart</button>
        <button type="button" class="btn_atc" onclick="removeItemViewCart();close__section_product();openViewCart();buyNow(${pro.id})">Buy Now</button>
        <div class="info-other">
            <button class="accordion">PRODUCT INFO</button>
            <div class="panel">
                <p>I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.</p>
            </div>
            <button class="accordion">RETURN & REFUND POLICY</button>
            <div class="panel">
                <p>I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.</p>
            </div>
        </div>
        <div class="icon-media">
            <i class="ri-messenger-fill"></i>
            <i class="ri-facebook-fill"></i>
            <i class="ri-twitter-fill"></i>
            <i class="ri-pinterest-fill"></i>
        </div>
    </div>
</div>   
    </div>
    </div>
        `
    });
    document.getElementById('view_products').innerHTML+=`
    <button onclick="open__section_home()" class="close1" id="close1_pr"><i class="ri-close-circle-line"></i></button>`;
    close__section_home();
}
// xóa view product
function remove__view_product(){
    document.getElementById('view_products').innerHTML="";
}








