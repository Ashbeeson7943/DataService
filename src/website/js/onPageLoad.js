
window.addEventListener('load', async (submittedEvent) => {
  let loginValidation = await fetch(`http://localhost:9000/api/generic/v1/user/validateToken`, {})
  let sb = document.getElementById('sideBar')
  let sidebar = document.createElement('div')
  sidebar.innerHTML = `
        ${displaySidenav(loginValidation)}
        `
  sb.appendChild(sidebar)
  let tb = document.getElementById('topBar')
  let topBar = document.createElement('div')
  topBar.innerHTML = `
    ${displayTopnav(loginValidation)}
  `
  tb.appendChild(topBar)
})

function displaySidenav(loginValidation) {
  if (loginValidation.status == 200) {
    return `
        <div class="sidenav">
            <a href="./dataRegisterPage.html" id="register">Register Data</a>
            <a href="./dataStoragePage.html" id="store">Get Stored Data</a>
            <a href="./dataGenerationPage.html" id="generate">Data Generator Tools</a>
        </div>
        `;
  } else {
    return `
            
        `;
  }
}

function displayTopnav(loginValidation) {
  if (loginValidation.status == 200) {
    return `
      <div class="topnav">
        <a href="./homepage.html">Home</a>
        <a href="#" class="split" onclick="logout()" id="logout">logout</a>
      </div>
    `
  } else {
    return `
      <div class="topnav">
        <a href="./homepage.html">Home</a>
        <a id="login" href="#" class="split" onclick="document.getElementById('loginModal').style.display='block'">Login</a>
      </div>
      <div id="loginModal" class="modal">
        <span onclick="document.getElementbyId('loginModal').style.display='none'" class="close" title="Close Modal">&times;</span>
          <form id="loginForm" class="modal-content animate">
            <div class="imgcontainer">
              <img src="../images/img_avatar2.png" alt="Avatar" class="avatar">
            </div>
            
            <div class="container">
              <label for="uname"><b>Username</b></label>
              <input id="username" type="text" placeholder="Enter Username" name="uname" required>
            
              <label for="psw"><b>Password</b></label>
              <input id="password" type="password" placeholder="Enter Password" name="psw" required>
            
              <button id="accept" type="submit" onclick="login()">Login</button>
              <label>
                <input type="checkbox" name="remember"> Remember me
              </label>
            </div>
            
            <div class="container">
              <button type="button" onclick="document.getElementById('loginModal').style.display='none'" class="cancelbtn">Cancel</button>
              <a class="psw" href="#">Forgot password?</a>
            </div>
          </form>

      </div>
    `
  }
}