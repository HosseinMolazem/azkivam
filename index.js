const $ = document;

//slider

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  slides[slideIndex - 1].style.display = "block";
}
// end slider

const data = {
  validity: null,
  time: null,
  job: null,
  salary: null,
  installment: null,
  installment_fee: null,
  national_card: null,
  birth_certificate: null,
  check: null,
  pay_slip: null,
  nationality_code: null,
  phone: null,
};

const volumeInp = $.getElementById("volume");
const showVolume = $.getElementById("showVolume");
const ChoiseTime = $.querySelectorAll(".ChoiseTime");
const nextPage = $.getElementById("next1");
const nextPage2 = $.getElementById("next2");
const inpSalary = $.getElementById("inpSalary");
const Installment = $.querySelector("#Installment");
const installmentFee = $.getElementById("installmentFee");
const nextPage3 = $.getElementById("next3");
const loaderd = $.getElementById("loader");
const displayPage3 = $.getElementById("displayPage3");
const fish = $.getElementById("fish");
const personCart = $.getElementById("personCart");
const chek = $.getElementById("chek");
const shenasname = $.getElementById("shenasname");
const codmeli = $.getElementById("codmeli");
const telphone = $.getElementById("telphone");
const newpage = $.getElementById("newpage");
const formdata = new FormData();

// volume
volumeInp.addEventListener("change", test);

function test() {
  showVolume.innerHTML = volumeInp.value;
}

// page1

let selectBtn = null;
let time = null;
ChoiseTime.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (selectBtn) {
      selectBtn.style.backgroundColor = "white";
      selectBtn.style.color = "red";
    }
    e.target.style.backgroundColor = "red";
    e.target.style.color = "white";
    selectBtn = e.target;
    time = e.target.dataset.time;
  });
});

nextPage.addEventListener("click", () => {
  data.validity = Number(showVolume.innerHTML * 1000000);
  data.time = Number(time);
  // formdata.append("validity", Number(showVolume.innerHTML * 1000000));
  // formdata.append("time", Number(time));
  // for (const [key, value] of formdata) {
  //     console.log(`${key} nad  ${value}`);
  // }
});

// page2
let job = null;
let lable = $.querySelectorAll("label");
lable.forEach((item) => {
  item.addEventListener("click", () => {
    job = item.dataset.job;
  });
});

nextPage2.addEventListener("click", () => {
  data.job = job;
  // formdata.append("job", job);
  // for (const [key, value] of formdata) {
  //     console.log(`${key} nad  ${value}`);
  // }
});

// new page
newpage.addEventListener("click", () => {
  data.check = chek.files[0].name;
  data.phone = Number(telphone.value);
  data.nationality_code = Number(codmeli.value);
  data.national_card = personCart.files[0].name;
  data.birth_certificate = shenasname.files[0].name;
  data.pay_slip = fish.files[0].name;
  // formdata.append("check", chek.files[0]);
  // formdata.append("national_card", personCart.files[0]);
  // formdata.append("birth_certificate", shenasname.files[0]);
  // formdata.append("pay_slip", fish.files[0]);
  // formdata.append("phone", Number(telphone.value));
  // formdata.append("nationality_code", Number(codmeli.value));
  // for (const [key, value] of formdata) {
  //     console.log(`${key} nad  ${value}`);
  // }
});

// page3
let installment = null;
Installment.childNodes.forEach((item) => {
  item.addEventListener("click", (e) => {
    installment = Boolean(e.target.dataset.installment);
  });
});
nextPage3.addEventListener("click", async () => {
  let loader = true;

  data.salary = Number(inpSalary.value);
  data.installment = installment;
  data.installment_fee = Number(installmentFee.value);
  console.log(data);
  // formdata.append("salary", Number(inpSalary.value));
  // formdata.append("installment", installment);
  // formdata.append("installment_fee", Number(installmentFee.value));

  // for (const [key, value] of formdata) {
  //     console.log(`${key} nad  ${value}`);
  // }
  displayPage3.style.display = "none";
  loaderd.style.display = "block";

  if (
    data.birth_certificate &&
    data.check &&
    data.installment &&
    data.installment_fee &&
    data.job &&
    data.national_card &&
    data.nationality_code &&
    data.pay_slip &&
    data.phone &&
    data.salary &&
    data.time &&
    data.validity
  ) {
    try {
      await fetch(`https://test-qp1u.onrender.com/food`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        console.log(res.status);
        if (res.status === 201) {
          Swal.fire({
            title: "موفق",
            text: "اطلاعات شما با موفقیت ذخیره شد",
            icon: "success",
            confirmButtonText: "Ok",
          });
          loaderd.style.display = "none";
          displayPage3.style.display = "block";
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "مشکل سیستم !",
        text: "کاربر عزیز متاسفانه سیستم مشکل داره :(",
        icon: "error",
        confirmButtonText: "Ok",
      });
      loaderd.style.display = "none";
      displayPage3.style.display = "block";
    }
    console.log(data);
  } else {
    Swal.fire({
      title: "خطا!",
      text: "کاربر عزیز لطفا تمام اطلاعات را تکمیل کنید",
      icon: "error",
      confirmButtonText: "Ok",
    });
    loaderd.style.display = "none";
    displayPage3.style.display = "block";
  }
});

//
