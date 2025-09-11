const {app, BrowserWindow} = 
require('electron') 

function createWindow () {
    const win = new BrowserWindow({
        width: 450, 
        height: 800, 
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('home.html')
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
    if (process.platform != 'darwin')
    app.quit()
})