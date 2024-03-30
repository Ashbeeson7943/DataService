



export function dataNotFound(id) {
    document.getElementById('dataViewer').innerHTML = JSON.stringify({ message: `Information not found with ID: ${id}` })
}