
window.addEventListener('load', (submittedEvent) => {
  let sb = document.getElementById('sideBar')
  let sidebar = document.createElement('div')
  sidebar.innerHTML = `
        ${isLoggedIn()}
        `
  sb.appendChild(sidebar)
})


function isLoggedIn() {
  let loggedIn = false
  if (loggedIn) {
    return `
        <div class="sidenav">
            <a href="./homepage.html" id="home">Home</a>
            <a href="./dataRegisterPage.html" id="register">Register Data</a>
            <a href="./dataStoragePage.html" id="store">Get Stored Data</a>
            <a href="./dataGenerationPage.html" id="generate">Data Generator Tools</a>
        </div>
        `;
  } else {
    return `

            <div class="sidenav">
                <a id="login" href="#" onclick="document.getElementById('loginModal').style.display='block'">Login</a>
                <a href="./homepage.html" id="home">Home</a>
            </div>
            <div id="loginModal" class="modal">
                <span onclick="document.getElementbyId('loginModal').style.display='none'" class="close" title="Close Modal">&times;</span>

                <form id="loginForm" class="modal-content animate" action="/action_page.php">
                <div class="imgcontainer">
                  <img src="../images/img_avatar2.png" alt="Avatar" class="avatar">
                </div>
            
                <div class="container">
                  <label for="uname"><b>Username</b></label>
                  <input type="text" placeholder="Enter Username" name="uname" required>
            
                  <label for="psw"><b>Password</b></label>
                  <input type="password" placeholder="Enter Password" name="psw" required>
            
                  <button id="accept" type="submit">Login</button>
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
        `;
  }
}