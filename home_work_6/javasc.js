let userData = [
  {
    id: 1,
    userName: "binh",
    pin: "1111",
    money: 10000,
  },
  {
    id: 2,
    userName: "thanh",
    pin: "2222",
    money: 20000,
  },
  {
    id: 3,
    userName: "tu",
    pin: "3333",
    money: 30000,
  },
];

function login() {
  let userPin = prompt("Nhập mã pin của bạn");
  let user = userData.find((user) => user.pin === userPin);
  let userId;

  if (user) {
    alert("Success! Welcome, " + user.userName);
    userId = user.id;
    handleOption(userId);
  } else {
    alert("Mã PIN sai. Vui lòng thử lại.");
  }
}
function handleOption(userId) {
  let userChoice;

  while (userChoice !== "5") {
    userChoice = prompt(
      "Hãy nhập số để thực hiện: \n 1: Rút tiền \n 2: Nạp tiền \n 3: Chuyển tiền \n 4: Kiểm tra số dư \n 5: Thoát"
    );

    switch (userChoice) {
      case "1":
        alert("Bạn đã chọn rút tiền.");
        handleCashOut(userId);
        break;
      case "2":
        alert("Bạn đã chọn nạp tiền.");
        handleCashIn(userId);
        break;
      case "3":
        alert("Bạn đã chọn chuyển tiền.");
        handlePaypal(userId);
        break;
      case "4":
        alert("Bạn đã chọn kiểm tra số dư.");
        handleCheckOut(userId);
        break;
      case "5":
        alert("Thoát chương trình.");
        break;
      default:
        alert("Lựa chọn không hợp lệ, vui lòng thử lại.");
    }
  }
}

function handleCashOut(userId) {
  let currentUser = userData.find((user) => user.id === userId);
  let moneyInput;

  do {
    moneyInput = prompt("Nhập số tiền bạn muốn rút");

    if (isNaN(moneyInput) || moneyInput <= 0) {
      alert("Số tiền không hợp lệ, vui lòng thử lại.");
      continue;
    }

    if (moneyInput <= currentUser.money) {
      currentUser.money -= moneyInput;
      alert(
        `Bạn đã rút thành công ${moneyInput}. Số dư còn lại là ${currentUser.money}.`
      );
      handleUpdateMoney(userId, currentUser.money);
      break;
    } else {
      alert("Số tiền trong tài khoản không đủ. Vui lòng nhập lại.");
    }
  } while (true);
}

function handleCashIn(userId) {
  let currentUser = userData.find((user) => user.id === userId);
  let moneyInput;

  do {
    moneyInput = prompt("Nhập số tiền bạn muốn nạp");

    if (isNaN(moneyInput) || moneyInput <= 0) {
      alert("Số tiền không hợp lệ, vui lòng nhập lại.");
      continue;
    }

    currentUser.money += parseFloat(moneyInput);
    alert(
      `Bạn đã nạp thành công ${moneyInput}. Số dư còn lại là ${currentUser.money}.`
    );
    handleUpdateMoney(userId, currentUser.money);
    break;
  } while (true);
}
function handleCheckOut(userId) {
  let currentUser = userData.find((user) => user.id === userId);
  alert(`Số dư hiện tại của bạn : ${currentUser.money}.`);
}

function handlePaypal(userId) {
  let currentUser = userData.find((user) => user.id === userId);
  let moneyInput, otherUserId, getMoneyUser;
  do {
    moneyInput = prompt("Nhập số tiền bạn muốn chuyển");

    if (isNaN(moneyInput) || moneyInput <= 0) {
      alert("Số tiền không hợp lệ, vui lòng nhập lại.");
      continue;
    }

    otherUserId = +prompt("Nhập id của người bạn muốn gửi");
    getMoneyUser = userData.find((user) => user.id === otherUserId);
    if (!getMoneyUser) {
      alert("ID người nhận không hợp lệ, vui lòng nhập lại.");
      continue;
    }

    if (moneyInput <= currentUser.money) {
      currentUser.money -= moneyInput;
      getMoneyUser.money += Number(moneyInput);
      alert(
        `Bạn đã chuyển thành công ${moneyInput}. Số dư còn lại là ${currentUser.money}.`
      );
      break;
    } else {
      alert("Số tiền trong tài khoản không đủ. Vui lòng nhập lại.");
    }
  } while (true);
}

function handleUpdateMoney(userId, userMoney) {
  let currentUser = userData.find((user) => user.id === userId);
  let updatedUser = {
    id: currentUser.id,
    userName: currentUser.userName,
    pin: currentUser.pin,
    money: userMoney,
  };

  userData = userData.map((user) =>
    user.id === currentUser.id ? updatedUser : user
  );
}
