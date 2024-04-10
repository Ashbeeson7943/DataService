
window.addEventListener('load', (submittedEvent) => {
    let sb = document.getElementById('sideBar')
    let sidebar = document.createElement('div')
    sidebar.innerHTML = `
        <div class="sidenav">
            <a href="./homepage.html">Homepage</a>
            <a href="./dataRegisterPage.html">Register Data</a>
            <a href="./dataStoragePage.html">Get Stored Data</a>
            <a href="./dataGenerationPage.html">Data Generator Tools</a>
        </div>
        `
    sb.appendChild(sidebar)
})


