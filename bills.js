const Bill_api = "https://61c16f3d9dbcca0017c81ed3.mockapi.io/api/Bills";
// ẩn hiện bill
function openBill() {
  document.getElementById("bill").style.display = "block";
}
function closeBill() {
  document.getElementById("bill").style.display = "none";
}

// xuất bill
function showBill() {
  var Total = document.getElementById("Total").innerHTML;
  document.getElementById("totalALl").innerHTML = Total;
  for (var ele of pro_in_cart) {
    document.getElementById("content_pro").innerHTML += `
                            <div class="content_pro2">
                            <div class="Name_pro">
                                <p id="name_pro">${ele.name}</p>
                            </div>
                            <div class="qty">
                                <p id="qty_pro">${ele.qty}</p>
                            </div>
                            <div class="price">
                                <p id="price_pro">$${ele.qty * ele.price}.00</p>
                            </div>
                            </div>
        `;
  }
}

function removeProBill() {
  document.getElementById("content_pro").innerHTML = "";
}


// đẩy bill lên mock
function uploadBillToAPI() {
  var idCus = window.localStorage.getItem(CUSID);
  var detail = pro_in_cart;
  var total = document.getElementById("Total").innerHTML;
  var phone = document.getElementById("phone_number_cus").value;
  var nameCus = document.getElementById("name_cus").value;
  var address = document.getElementById("address_cus").value;
  var note = document.getElementById("note").innerHTML;
  var date_order = new Date();
  var status = 'wait confirm';
  var formData = {
    idCus: idCus,
    detail: detail,
    total: total,
    phone: phone,
    nameCus: nameCus,
    address: address,
    note: note,
    date_order: date_order,
    status:status,
  };
  if (phone == "" || nameCus == "" || address == "") {
    check_form_formBill();
    return;
  } else {
    axios.post(Bill_api, formData);
    swal({
      title: "Success!",
      text: "wait confirm",
      icon: "success",
      button: "OK",
    });
    removeItem_in_array();
    removeItemAfterBuy();
    subtotalminiCart();
    countPro();
  }
}

// check font đăng nhập
function check_form_formBill() {
  var nameCus = document.getElementById("name_cus").value;
  var phone_number_cus = document.getElementById("phone_number_cus").value;
  var address = document.getElementById("address_cus").value;
  let data = "";
  switch (data) {
    case nameCus: {
      document.getElementById("bug6").style.display = "block";
    }
    case phone_number_cus: {
      document.getElementById("bug7").style.display = "block"; 
    }
    case address: {
      document.getElementById("bug8").style.display = "block";
    }
  }
}
function close_bug_nameCus() {
  document.getElementById("bug6").style.display = "none";
}
function close_bug_phone_number_cus() {
  document.getElementById("bug7").style.display = "none";
}
function close_bug_address_cus() {
  document.getElementById("bug8").style.display = "none";
}

// function xóa tất cả các phần tử trong mảng
function removeItem_in_array() {
  pro_in_cart.splice(0, pro_in_cart.length);
}

// history #####################
function openHistory() {
  document.getElementById("history").style.display = "block";
  document.getElementById('tbody_history').innerHTML='';
  getDatatoHistoryPage();

}
function closeHistory() {
  document.getElementById("history").style.display = "none";
}

function convertDate(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${date.getFullYear()}`;
}

// xuất ra bill đã mua

// getDatatoHistoryPage();
function getDatatoHistoryPage() {
  var idCusLogin = window.localStorage.getItem(CUSID);
  var count = 0;
  axios.get(Bill_api).then((res) => {
    var billArr = res.data;
    for (var bill of billArr.reverse()) {
        var src;
    var statusinAPI =bill.status
    if (statusinAPI=='wait confirm'){
        src =`img/iconoder.png`;
    }else if(statusinAPI=='confirmed'){
        src =`img/oderthanhcong.png`;
    }else if(statusinAPI=='shipping'){
        src =`img/shipping.png`;
     }else{
        src='img/delivered.png'
    };
      if (bill.idCus == idCusLogin) {
        count = count + 1;
        var date_order1 = convertDate(new Date(bill.date_order));
        document.getElementById("tbody_history").innerHTML += `
                                <tr>
                                    <td>${count}</td>
                                    <td>DAG${bill.id}${new Date(bill.date_order).getTime()}</td>
                                    <td>${date_order1}</td>
                                    <td>${bill.total}</td>
                                    <td class="content_status" ><img class="status" src="${src}" alt=""></td>
                                    <td onclick="openStatusOrder(); OrderStatus(${bill.id})"><i class="ri-eye-fill"></i></td>
                                </tr>
                `;
      }
    }
  });
}

// xem chi tiết đơn hàng / theo dõi đơn hàng
function openStatusOrder() {
  document.getElementById("viewDetailOrder").style.display = "block";
  document.getElementById("main_history").style.display="none"
}
function closeStatusOrder() {
  document.getElementById("viewDetailOrder").style.display = "none";
  document.getElementById("main_history").style.display="block"

}
// lấy data theo id
function getDataBill(id){
    return axios(Bill_api+'/'+id)
}


// theo dõi sản phẩm
function OrderStatus(id){
    getDataBill(id)
    .then((res) =>{
        var date_order1 = convertDate(new Date(res.data.date_order));
        var bill =res.data
        document.getElementById("viewDetailOrder").innerHTML=`
        <div class="headerDetail" id="headerDetail${bill.id}">
        <div>
            <p>Order ID DAG${bill.id}${new Date(bill.date_order).getTime()}</p>
            <p>Order Day ${date_order1}</p>
        </div>
        <div>
            <button class="btn_back" onclick="closeStatusOrder()">&#8249;</button>
        </div>
    </div>

    <div class="mainDetail" id="mainDetail${bill.id}">
        
    </div>
    <div class="footerDetail" id="footerDetail">
        <ul id="progressbar">
            <li class="step" id="step1"><img class="icon_detaill" src="img/iconoder.png" alt=""> </li>
            <li class="step" id="step2"> <img class="icon_detaill" src="img/oderthanhcong.png" alt=""> </li>
            <li class="step" id="step3"> <img class="icon_detaill" src="img/shipping.png" alt=""> </li>
            <li class="step" id="step4"> <img class="icon_detaill" src="img/delivered.png" alt=""> </li>
        </ul>
    </div>
        `
    })
    getProductArray(id);
    ColorIcon(id);
}

// lấy sản phẩm từ mảng trong đối tượng
function getProductArray(id){
    getDataBill(id)
    .then((res) =>{
        var proArr=res.data.detail
        for( var pro of proArr){
            document.querySelector(".mainDetail").innerHTML+=`
            <div class="listProductDetail">
            <div>
                            <h5 class="name_product">${pro.name}</h5>
                            <p class="qty_product"> Qt: ${pro.qty} </p>
                            <h4 class=""> <span class="mt-5">$</span> ${pro.price}</h4>
                            <p class="text-muted">Estimated delivery date: <span class="Today">20/11/2002</span></p>
                            <button type="button" onclick="viewProduct(${pro.id});closeHistory()" class="buyAgain">Buy again</button>
                        </div>
                        <div>
                            <img class="imginDetail" src="${pro.image}" alt="">
                        </div>
                        </div>
            `
        }
    })
}

function ColorIcon(id){
    getDataBill(id)
    .then((res) =>{
        var statusinAPI =res.data.status
        if (statusinAPI=='wait confirm'){
            document.getElementById('step1').style.border ="5px solid var(--text-navbar-after-hover)";
            document.getElementById('step2').style.border="5px solid rgb(145, 145, 145)";
            document.getElementById('step3').style.border="5px solid rgb(145, 145, 145)";
            document.getElementById('step4').style.border="5px solid rgb(145, 145, 145)";
        }else if(statusinAPI=='confirmed'){
            document.getElementById('step1').style.border="5px solid var(--text-navbar-after-hover)";
            document.getElementById('step2').style.border="5px solid var(--text-navbar-after-hover)";
            document.getElementById('step3').style.border="5px solid rgb(145, 145, 145)";
            document.getElementById('step4').style.border="5px solid rgb(145, 145, 145)";
        }else if(statusinAPI=='shipping'){
            document.getElementById('step1').style.border="5px solid var(--text-navbar-after-hover)";
            document.getElementById('step2').style.border="5px solid var(--text-navbar-after-hover)";
            document.getElementById('step3').style.border="5px solid var(--text-navbar-after-hover)";
            document.getElementById('step4').style.border="5px solid rgb(145, 145, 145)";
         }else{
            document.getElementById('step1').style.border="5px solid var(--text-navbar-after-hover)";
            document.getElementById('step2').style.border="5px solid var(--text-navbar-after-hover)";
            document.getElementById('step3').style.border="5px solid var(--text-navbar-after-hover)";
            document.getElementById('step4').style.border="5px solid var(--text-navbar-after-hover)";
        };
    })

}
//  mua lại sản phẩm
