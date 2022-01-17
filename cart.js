
function add_to_cart(id) {
  for (var ele of pro_in_cart) {
    if (id == ele.id) {
      var qty = parseInt(document.getElementById("quantity").value);
      swal({
        title: "Success!",
        text: "You clicked the button!",
        icon: "success",
        button: "OK",
      });
      ele.qty += qty;
      document.getElementById("qty-" + (pro_in_cart.indexOf(ele) + 1)).setAttribute("value", ele.qty);
      return;
    }
  }
  getData(id)
    .then((res) => {
      var pro = res.data;
      var data = {
        id: id,
        image: pro.image,
        name: pro.name,
        price: pro.price,
        color: pro.type.color,
        qty: parseInt(document.getElementById("quantity").value)
      };
      pro_in_cart.push(data);
      countPro();
      subtotalminiCart();
      var rowId = pro_in_cart.length;
      document.getElementById("tbody_cart").innerHTML += `
                <tr id="Item-${rowId}">
                    <td id="img_column-${rowId}"><img src="${pro.image}" alt=""></td>
                    <td id="info_column-${rowId}">
                        <p>${pro.name}</p>
                        <p>$${pro.price}</p>
                        <input id="qty-${rowId}" type="number" min="0" max="100" value="${data.qty}" oninput="changeQty(${rowId})" onclick="subtotalminiCart();removeItemViewCart();viewCart()">
                    </td>
                    <td id="close_column" onclick="delCart(${rowId});removeItemInArray(${rowId-1});countPro();subtotalminiCart();removeItemViewCart();viewCart()"><i class="ri-close-fill" ></i></td>
                </tr>
            `;
    })
    .then(() => {
      swal({
        title: "Success!",
        text: "You clicked the button!",
        icon: "success",
        button: "OK",
      });
    });
    
}
function changeQty(id) {
  var qty = parseInt(document.getElementById("qty-" + id).value);
  pro_in_cart[id - 1].qty = qty;
  document.getElementById("qty-" + id).setAttribute("value", qty);
}
const pro_in_cart = [];

function countPro(){
  document.getElementById("countpro1").innerHTML= pro_in_cart.length;
  document.getElementById('countpro2').innerHTML=pro_in_cart.length;
  }
// ẩn sản phẩm trong dỏ hàng sau khi mua xong
function removeItemAfterBuy(){
  document.getElementById("tbody_cart").innerHTML=''
}
// xoa sản phẩm (giao diện)
function delCart(id) {
  document.getElementById("Item-" + id).remove();
  
}

// tính tổng tiền

function subtotalminiCart(){
  var subtotal=0;
  var price_pro;
  for(var ele of pro_in_cart){
    price_pro=ele.qty*ele.price;
    subtotal=subtotal+price_pro;
    
  }
  document.getElementById("cart-sub-total").innerHTML=subtotal
}
// xóa sản phẩm trong mảng
function removeItemInArray(id){
  pro_in_cart.splice(id,1);
}

// view cart ###############################
function viewCart(){
  for (var ele of pro_in_cart) {
    document.getElementById("product_list_in_view_cart").innerHTML+=`
                        <div class="prodcut_in_view_cart" id="prodcut_in_view_cart${ele.id}">
                            <div class="img_pro_cart">
                                <img src="${ele.image}" alt="">
                            </div>
                            <div class="infor_pro_cart">
                                <p>${ele.name}</p>
                                <p>$${ele.price}</p>
                                <p>Color: ${ele.color}</p>
                            </div>
                            <div class="quantity_pro_cart">
                                <p>Quantity: ${ele.qty}</p>
                            </div>
                            <div class="pice_pro_cart">
                                <p>$${ele.qty*ele.price}.00</p>
                            </div>
                            <div class="close_pro_cart">
                                <i class="ri-close-fill" onclick="removeItemInArray(${pro_in_cart.length-1});delCart(${pro_in_cart.length});removeItemViewCart();viewCart();subtotalminiCart();offer();getSubtotal();countPro()"></i>
                            </div>
                        </div>
                        <hr>

    `
  };
  getSubtotal();
  offer();
}
function getSubtotal(){
  var getSubtotal=document.getElementById("cart-sub-total").innerHTML;
  document.getElementById("Subtotal").innerHTML= "$"+getSubtotal+".00";
}
function removeItemViewCart(){
  document.getElementById("product_list_in_view_cart").innerHTML='';
}



// giảm giá
function offer(){
  var promo_code = document.getElementById("promo_code").value;
  var getSubtotal =parseInt(document.getElementById("cart-sub-total").innerHTML);
  var subtotalFinal=0;
  if(promo_code=='abcd'){
    subtotalFinal=getSubtotal-5
    document.getElementById("Total").innerHTML="$"+subtotalFinal+".00";
  }else{
    subtotalFinal=getSubtotal;
    document.getElementById("Total").innerHTML="$"+subtotalFinal+".00";
  }
}



// ẩn hiện note, promo code
function openPromo(){
  document.getElementById("text_promo_code").style.display="block"
}
function closePromo(){
  document.getElementById("text_promo_code").style.display="none"
}

function openNote(){
  document.getElementById("text_note").style.display="block"
}
function closeNote(){
  document.getElementById("text_note").style.display="none"
}
function openViewCart(){
  document.getElementById("view_cart").style.display="block";
  document.getElementById("decor").style.display = "none";
  document.getElementById("kitchen").style.display = "none";
  document.getElementById("about").style.display = "none";
  document.getElementById("contact").style.display = "none";
  document.getElementById("home").style.display = "none";
}

function closeViewCart(){
  document.getElementById("view_cart").style.display="none"
}

// mua ngay sản phẩm
function buyNow(id){
  for(var ele of pro_in_cart){
    if (id == ele.id) {
      var qty = parseInt(document.getElementById("quantity").value);
      ele.qty += qty;
      return;
  }
  }
  getData(id)
    .then((res) => {
      var pro = res.data;
      var data = {
        id: id,
        image: pro.image,
        name: pro.name,
        price: pro.price,
        color: pro.type.color,
        qty: parseInt(document.getElementById("quantity").value)
      };
      var qty=parseInt(document.getElementById("quantity").value);
    pro_in_cart.push(data);
    for (var ele of pro_in_cart) {
    document.getElementById("product_list_in_view_cart").innerHTML+=`
                        <div class="prodcut_in_view_cart" id="prodcut_in_view_cart${ele.id}">
                            <div class="img_pro_cart">
                                <img src="${ele.image}" alt="">
                            </div>
                            <div class="infor_pro_cart">
                                <p>${ele.name}</p>
                                <p>$${ele.price}</p>
                                <p>Color: ${ele.color}</p>
                            </div>
                            <div class="quantity_pro_cart">
                                <p>Quantity: ${ele.qty}</p>
                            </div>
                            <div class="pice_pro_cart">
                                <p>$${ele.qty*ele.price}.00</p>
                            </div>
                        </div>
                        <hr>

      `
    };
    subtotalminiCart2();
    checkpromo();
  })
}
  function checkpromo(){
    var promo_code = document.getElementById("promo_code").value;
    var subtotalFinal=0;
    var price_pro;
    if(promo_code=='abcd'){
      for(var ele of pro_in_cart){
        price_pro=ele.qty*ele.price;
        subtotalFinal=(subtotalFinal+price_pro)
      }
      subtotalFinal=subtotalFinal-5;
      document.getElementById("Total").innerHTML="$"+subtotalFinal+".00";
    }else{
      subtotalFinal=document.getElementById("Subtotal").innerHTML
      document.getElementById("Total").innerHTML=subtotalFinal;
    }
  }
  // tính tổng tiền
function subtotalminiCart2(){
  var subtotal=0;
  var price_pro;
  for(var ele of pro_in_cart){
    price_pro=ele.qty*ele.price;
    subtotal=subtotal+price_pro;
  }
  document.getElementById("Subtotal").innerHTML="$"+subtotal+".00";
}
  


