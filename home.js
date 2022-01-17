// cửa sổ
// navbar của mobile #################
function openNav() {
  document.getElementById("myNav").style.display = "block";
}
function closeNav() {
  document.getElementById("myNav").style.display = "none";
}

// ####### login ############

function openNav__login() {
  // mở của sổ login
  document.getElementById("myNav__login").style.display = "block";
}

function closeNav__login() {
  // đóng cửa sổ login
  document.getElementById("myNav__login").style.display = "none";
}

// ####### cart ############
function openCart() {
  // mở cửa sổ giỏ hàng
  document.getElementById("myCart").style.display = "block";
}


function closeCart() {
  // đóng cửa sổ giỏ hàng / PC/tablet/mobile
  document.getElementById("myCart").style.display = "none";
}
// ############# slide Banner #################
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

// ######### login pages ################
var login__page = 1;
showpage(login__page);

function next__page(n) {
  showpage((login__page += n));
}
function showpage(n) {
  var i;
  var pages = document.getElementsByClassName("logins");
  if (n > pages.length) {
    login__page = 1;
  }
  if (n < 1) {
    login__page = pages.length;
  }
  for (i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }
  pages[login__page - 1].style.display = "block";
}

// chuyển từ login sang chế độ đã đăng nhập (ACCOUNT)
// function change_login_block() {  // block sau khi đăng xuất
//   document.getElementById("nav__login").style.display = "block";
// }
function change_login_none() {
  // none sau khi đăng nhập
  document.getElementById("nav__login").style.display = "none";
  document.getElementById("nav__login_mobile").style.display = "none";

}
function change_account_block() {
  //block sau khi đăng nhập
  document.getElementById("nav__account").style.display = "block";
  document.getElementById("nav__account_moblile").style.display = "block";

}
function change_account_none() {
  // none sau khi đăng xuất
  document.getElementById("nav__account").style.display = "none";
  document.getElementById("nav__account_moblile").style.display = "none";

}

// Setting account (xem thông tin người dùng)
function open_setting_account() {
  document.getElementById("setting_account").style.display = "block";
  axios.get(url_customers + "/" + localStorage.getItem(CUSID)).then((res) => {
    var cus = res.data;
    document.getElementById("setting_email").innerText = cus.email;
    document.getElementById("setting_password").innerText = cus.password;
    document.getElementById("setting_phone").innerText = cus.phone_number;
    document.getElementById("setting_address").innerText = cus.address;
  });
}

// show thông tin người dùng để sửa
function show_user_info_old() {
  document.getElementById("setting_account").style.display = "block";
  axios.get(url_customers + "/" + localStorage.getItem(CUSID)).then((res) => {
    var cus = res.data;
    document.getElementById("edit_email").value = cus.email;
    document.getElementById("edit_password").value = cus.password;
    document.getElementById("edit_phone").value = cus.phone_number;
    document.getElementById("edit_address").value = cus.address;
  });
}
// cập nhập thông tin sau khi sửa
function done_edit_info() {
  var email = document.getElementById("edit_email").value;
  var password = document.getElementById("edit_password").value;
  var phone = document.getElementById("edit_phone").value;
  var address = document.getElementById("edit_address").value;
  var formData = {
    email: email,
    password: password,
    phone_number: phone,
    address: address,
  };
  axios
    .put(url_customers + "/" + localStorage.getItem(CUSID), formData)
    .then(() => {
      location.reload();
    });
}

function close_setting_account() {
  document.getElementById("setting_account").style.display = "none";
}


// chuyển đổi giữa edit và done;
function open_form_edit() {
  document.getElementById("edit__account").style.display = "block";
  document.getElementById("your__account").style.display = "none";
}

function close_form_edit() {
  document.getElementById("edit__account").style.display = "none";
  document.getElementById("your__account").style.display = "block";
}

// icon user khi đăng nhập
// var icon_user = document.querySelectorAll(".nav__account")
//  var i
//  for(i =0 ; i <icon_user.length; i++){
//    icon_user[i].innerHTML=`
// <i class="ri-account-circle-line"></i>`;
//  }
// ######### login ############

// customers @@@@@@@
const url_customers =
  "https://61c16f3d9dbcca0017c81ed3.mockapi.io/api/Customers";

//  đăng nhập
const CUSID = "cusid";
function sign_in_account() {
  var email = document.getElementById("login_email").value;
  var password = document.getElementById("login_password").value;
  axios.get(url_customers).then((res) => {
    var cusArr = res.data;
    var count = 0;
    for (var cus of cusArr) {
      if (email == cus.email && password == cus.password) {
        count = 0;
        sign_in_successful();
        window.localStorage.setItem(CUSID, cus.id);
        change_login_none();
        change_account_block();
        setAccount();
         var a =document.querySelectorAll(".nav__account");
         for(var i =0; i<a.length; i++){
           a[i].innerHTML=`
           <i class="ri-account-circle-line"></i>` + cus.email;
         }
        return;
      } else {
        count = 1;
      }
    }
    if (count == 1) {
      sign_in_failed();
      removeInput();
      setTimeout(remover_toast_sign_in_failed, 5000);
    }
  });
}
// Thông báo đăng nhập thành công
function sign_in_successful() {
  var content =
    "<h1>Hi! Welcome to Indoor </h1>" +
    "<br><p>Change the look of your house, change the perspective of others</p>";
  document.getElementById("item__login").innerHTML = content;
}
// thông báo khi đăng nhập sai!
function sign_in_failed() {
  document.getElementById("item__login").innerHTML += `
  <p id="failed">Email and password don't match!</p>`;
}
// xóa thông báo khi đăng nhập sai!
function remover_toast_sign_in_failed() {
  var parent = document.getElementById("item__login");
  var child = document.getElementById("failed");
  parent.removeChild(child);
}
// xóa dữ liệu khi nhập vào sai
function removeInput() {
  document.getElementById("login_email").value = "";
  document.getElementById("login_password").value = "";
}
// thông báo đăng ký thành công!
function sign_up_successful() {
  var content =
    "<div class='form__signup'>" +
    "<h1>Sign Up Success</h1>" +
    "<br> <p>Sign In Now</p>" +
    "<button  type='button' onclick='next__page(-1)' class='btn_signup'>SIGN IN</button>" +
    "</div>";
  document.getElementById("item__signup").innerHTML = content;
}
//  tạo tài khoản
function addAccount() {
  var email = document.getElementById("signUp__email").value;
  var password = document.getElementById("signUp_password").value;
  var phone_number = document.getElementById("signUp_phone").value;
  var address = document.getElementById("signUp_Address").value;
  var formData = {
    email: email,
    password: password,
    phone_number: phone_number,
    address: address,
  };
  if (email == "" || password == "" || phone_number == "" || address == "") {
    check_form_sign_up();
    return;
  } else {
    axios.get(url_customers).then((res) => {
      var cusArr = res.data;
      for (var cus of cusArr) {
        if (email == cus.email) {
          document.getElementById(
            "signUp__email1"
          ).innerHTML += `<p id="bug_mail">Email already exists!</p>`;
          return;
        }
      }
      axios.post(url_customers, formData).then(() => {
        sign_up_successful();
      });
    });
  }
}
// ẩn thông báo lỗi mail
function close_bug2_email() {
  var parent = document.getElementById("signUp__email1");
  var child = document.getElementById("bug_mail");
  parent.removeChild(child);
}
// bug khi nhập form lỗi!
function check_form_sign_up() {
  var email = document.getElementById("signUp__email").value;
  var password = document.getElementById("signUp_password").value;
  var phone_number = document.getElementById("signUp_phone").value;
  var address = document.getElementById("signUp_Address").value;
  var data = "";
  switch (data) {
    case email: {
      document.getElementById("bug1").style.display = "block";
    }
    case password: {
      document.getElementById("bug2").style.display = "block"; 
    }
    case phone_number: {
      document.getElementById("bug3").style.display = "block";
    }
    case address: {
      document.getElementById("bug4").style.display = "block";
    }
  }
}
// ẩn bug
function close_bug_email() {
  document.getElementById("bug1").style.display = "none";
}
function close_bug_password() {
  document.getElementById("bug2").style.display = "none";
}
function close_bug_phone_number() {
  document.getElementById("bug3").style.display = "none";
}
function close_bug_address() {
  document.getElementById("bug4").style.display = "none";
}
// Đăng xuất

function sign_out_account() {
  window.localStorage.setItem(CUSID, "");
  setAccount();
  location.reload();
}

// lay id tu localStorage
const setAccount = () => {
  var cusId = window.localStorage.getItem(CUSID);
  change_login_none();
  change_account_block();
  axios.get(url_customers + "/" + cusId).then((res) => {
    var a =document.querySelectorAll(".nav__account");
         for(var i =0; i<a.length; i++){
           a[i].innerHTML=`
           <i class="ri-account-circle-line"></i>` + res.data.email;
         }
  });
};

//  admin @@@@@@@
const url_admin = "https://61c16f3d9dbcca0017c81ed3.mockapi.io/api/admin";

// chuyển đổi giữa các trang
function openHomePage() {
  document.getElementById("home").style.display = "block";
  document.getElementById("decor").style.display = "none";
  document.getElementById("kitchen").style.display = "none";
  document.getElementById("about").style.display = "none";
  document.getElementById("contact").style.display = "none";
  remove__view_product();
  closeViewCart();
  removeItemViewCart();
  closeBill()
}
function openDecorPage() {
  document.getElementById("home").style.display = "none";
  document.getElementById("decor").style.display = "block";
  document.getElementById("kitchen").style.display = "none";
  document.getElementById("about").style.display = "none";
  document.getElementById("contact").style.display = "none";
  remove__view_product();
  closeViewCart();
  removeItemViewCart();
  closeBill()
}
function openKitchenPage() {
  document.getElementById("home").style.display = "none";
  document.getElementById("decor").style.display = "none";
  document.getElementById("kitchen").style.display = "block";
  document.getElementById("about").style.display = "none";
  document.getElementById("contact").style.display = "none";
  remove__view_product();
  closeViewCart();
  removeItemViewCart();
  closeBill()
}
function openAboutPage() {
  document.getElementById("home").style.display = "none";
  document.getElementById("decor").style.display = "none";
  document.getElementById("kitchen").style.display = "none";
  document.getElementById("about").style.display = "block";
  document.getElementById("contact").style.display = "none";
  remove__view_product();
  closeViewCart();removeItemViewCart();
  closeBill()
}
function openContactPage() {
  document.getElementById("home").style.display = "none";
  document.getElementById("decor").style.display = "none";
  document.getElementById("kitchen").style.display = "none";
  document.getElementById("about").style.display = "none";
  document.getElementById("contact").style.display = "block";
  remove__view_product();
  closeViewCart();
  removeItemViewCart();
  closeBill()
}

if (window.localStorage.getItem(CUSID) != "") setAccount();

// bắt đăng nhập khi muốn mua
function Check_login(){
  if(window.localStorage.getItem(CUSID) == ""){
    removeItemInArray(0);
    closeViewCart();
    openNav__login();
  }else{
    closeViewCart();
    openBill();
    showBill();
  }
}

// login with admin

const url_ADMIN="https://61c16f3d9dbcca0017c81ed3.mockapi.io/api/AcountADMIN";

function sign_in_account_admin() {
  var email = document.getElementById("login_email_admin").value;
  var password = document.getElementById("login_password_admin").value;
  axios.get(url_ADMIN).then((res) => {
    var adminArr = res.data;
    for (var admin of adminArr) {
      if (email == admin.email && password == admin.password) {
        window.location.href="http://172.29.128.1:5500/PROJECT/admin.html"
    }
  }
  });

}

function send(){
  var email = document.getElementById("emailuser").value;
  sendEmail(email);
}

// gửi Email
function sendEmail(email) {
	return Email.send({
	Host: "smtp.gmail.com",
	Username : "hoquoctri10b7@gmail.com",
	Password : "foykcgfdzgolgsua",
	To : `${email}`,
	From : "hoquoctri10b7@gmail.com",
	Subject : "Promo code form INDOOR",
	Body : "Promo code: ABCD",
	});
}