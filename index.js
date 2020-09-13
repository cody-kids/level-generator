let App = function(canvasWidth, canvasHeight, rows, cols) {
    this.canvasWidth = canvasWidth || 300
    this.canvasHeight = canvasHeight || 300
    this.rows = rows || 5
    this.cols = cols || 5
    this.canvas = document.getElementById("canvas")
    this.textArea = document.getElementById("jsonText")
    this.levelJson = {
        name: "",
        grid: {
            rows: this.rows,
            cols: this.cols
        },
        path: [],
        actions: [],
        playerUrl: "",
        start: "",
        end: ""
    }
    this.drawMode = "safe"

    this.initApp = () => {
        console.log("init")
        document.getElementById("safe").addEventListener("click", this.handlers.toggleMode)
        document.getElementById("start").addEventListener("click", this.handlers.toggleMode)
        document.getElementById("end").addEventListener("click", this.handlers.toggleMode)
        document.getElementById("actions").addEventListener("change", this.handlers.addAction, )
        document.getElementById("levelName").addEventListener("keyup", this.handlers.changeLevelName)
        fetch("/data/actions.json")
        .then(res => res.json())
        .then(data => {
            this.actions = data.actions
            this.renderApp()
        })
    }

    this.renderApp = () => {
        this.canvas.style.width = `${this.canvasWidth}px`
        this.canvas.style.height = `${this.canvasHeight}px`
        const blockHeight = this.canvasHeight/this.rows,
            blockWidth = this.canvasWidth/this.cols
        this.textArea.value = JSON.stringify(this.levelJson)

        if(document.getElementsByClassName("block").length < 1 ) {
            console.log("rendering")
            for(let i =0 ;i<this.rows;i++) {
                let row = document.createElement("div")
                row.classList = "row"
                for(let j =0;j<this.cols; j++) {
                    let block = document.createElement("div")
                    block.id = `${i}_${j}`
                    block.classList = "block"
                    block.style.width = `${blockWidth}px`
                    block.style.height = `${blockHeight}px`
                    block.style.border = "1px solid black"
                    block.style.backgroundColor = "#ffffff"
                    block.addEventListener("click", this.handlers.handleCanvasBoxClick)
                    row.appendChild(block)
                }
                this.canvas.appendChild(row)
            }

            let actionSelect = document.getElementById("actions")
            this.actions.forEach(action => {
                let option = document.createElement("option")
                option.innerHTML = action.name
                option.value = action.id
                actionSelect.appendChild(option)


            })
        }
    },

    this.updateApp = () => {
        this.textArea.value = JSON.stringify(this.levelJson)
    },

    this.renderForm = () => {

    }

    this.handlers = {
        handleCanvasBoxClick: (e) => {
            if (this.drawMode === "safe") {
                e.currentTarget.style.backgroundColor = "#37B6F6"
                this.levelJson.path.push(e.currentTarget.id)
                this.levelJson.path = Array.from(new Set(this.levelJson.path))
            } else if (this.drawMode === "start") {
                let startBlock = document.getElementsByClassName("start-block")[0]
                if (startBlock) {
                    startBlock.style.backgroundColor = "#ffffff"
                    startBlock.classList.remove("start-block")
                }
                e.currentTarget.style.backgroundColor = "#35D461"
                e.currentTarget.classList.add("start-block")
                this.levelJson.start = e.currentTarget.id
            } else if(this.drawMode === "end") {
                let startBlock = document.getElementsByClassName("end-block")[0]
                if (startBlock) {
                    startBlock.style.backgroundColor = "#ffffff"
                    startBlock.classList.remove("end-block")
                }
                e.currentTarget.classList.add("end-block")
                
                e.currentTarget.style.backgroundColor = "#fd3939"
                this.levelJson.end = e.currentTarget.id
            }
            this.updateApp()
        },
        toggleMode: (e) => {
            this.drawMode = e.currentTarget.id
        },
        addAction: (e) => {
            e.preventDefault()
                let action = this.actions.find(action => action.id == e.target.value)
                let isActionSaved = this.levelJson.actions.find(act => action.id == act.id)
                if (!isActionSaved) {
                    this.levelJson.actions.push(action)
                    let actionList = document.getElementById("action-list")
                    let listItem = document.createElement("li")
                    listItem.classList = "list-group-item"
                    listItem.innerHTML = action.name
                    let deleteBtn = document.createElement("button")
                    deleteBtn.classList = "btn btn-danger"
                    deleteBtn.innerHTML = "x"
                    deleteBtn.addEventListener("click", (e) => this.handlers.removeAction(e, action.id))
                    listItem.appendChild(deleteBtn)
                    actionList.appendChild(listItem)
                    this.updateApp()
                }
                
        },
        removeAction:(e, id) => {
            e.preventDefault()
            e.currentTarget.parentNode.remove()
            this.levelJson.actions = this.levelJson.actions.filter(action=> action.id != id)
            this.updateApp()
        },
        changeLevelName: (e) => {
            e.preventDefault()
            this.levelJson.name = e.currentTarget.value
            this.updateApp()
        }
    }
}

window.onload = (e)=> {
    const app = new App(300, 300, 5, 5)
    app.initApp()
}
console.log("here")