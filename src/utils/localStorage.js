const userKey = "userList";

export function getUserList() {
  return JSON.parse(localStorage.getItem(userKey)) || [];
}

export function setUserList(userList) {
  localStorage.setItem(userKey, JSON.stringify(userList));
}

export function newId() {
  let id = JSON.parse(localStorage.getItem("id")) || "0";
  localStorage.setItem("id", JSON.stringify(++id));
  return id;
}
