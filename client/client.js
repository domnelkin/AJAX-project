const requestURL = 'http://localhost:3000'

function sendRequest(method, url, body = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open(method, url)

    xhr.responseType = 'json'
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response)
      } else {
        resolve(xhr.response)
      }
    }

    xhr.onerror = () => {
      reject(xhr.response)
    }

    xhr.send(JSON.stringify(body))
  })
}

const requestButton = document.getElementById("request_button");
const contentDiv = document.getElementById("content");
  
requestButton.addEventListener("click", function() {
    sendRequest('GET', requestURL)
        .then(data => {
            Array.from(JSON.parse(data)).forEach(user => {
                const userItem = document.createElement("div");
                userItem.className = "userInfo"
                userItem.innerHTML = 
                `
                <p id="user_id">User id: ${user.id}</p>\n
                <p id="name">Name: ${user.first_name}</p>\n
                <p id="last_name">Last name: ${user.last_name}</p>\n
                <p id="email">Email: ${user.email}</p>\n
                <img src=${user.photo}></img>
                `
                contentDiv.appendChild(userItem);
            })
        })
        .catch(err => console.log(err));
});