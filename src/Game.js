import Shape from "./Shape.js";

export default class Game {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.shapes = [];
        this.lastSpawnTime = 0;
        this.spawnInterval = 1000;

        this.shapeCountEl = document.getElementById("shapeCount");
        this.shapeAreaEl = document.getElementById("shapeArea");

        this.resizeCanvas();
        window.addEventListener("resize", () => this.resizeCanvas());

        this.canvas.addEventListener("click", (event) => this.handleCanvasClick(event));
    }

    start() {
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    updateStats() {
        const count = this.shapes.length;

        let totalArea = 0;
        for (const shape of this.shapes) {
            totalArea += shape.getArea();
        }

        this.shapeCountEl.textContent = count;
        this.shapeAreaEl.textContent = Math.round(totalArea);
    }

    gameLoop(timestamp) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (timestamp - this.lastSpawnTime > this.spawnInterval) {
            this.spawnShape();
            this.lastSpawnTime = timestamp;
        }

        for (const shape of this.shapes) {
            shape.update();
            shape.draw(this.ctx);
        }
        this.shapes = this.shapes.filter(
            shape => shape.y - shape.radius <= this.canvas.height
        );
        this.updateStats();

        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    spawnShape() {

        const radius = 20 + Math.random() * 20;
        const x = radius + Math.random() * (this.canvas.width - radius * 2);
        const y = -radius - Math.random() * 100;

        const color = this.getRandomColor();
        const shape = new Shape(x, y, radius, color);
        this.shapes.push(shape);
    }

    handleCanvasClick(event) {
        const rect = this.canvas.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        for (let i = this.shapes.length - 1; i >= 0; i--) {
            if (this.shapes[i].containsPoint(x, y)) {
                this.shapes.splice(i, 1);
                return;
            }
        }

        const radius = 20 + Math.random() * 20;

        const color = this.getRandomColor();
        const shape = new Shape(x, y, radius, color);
        this.shapes.push(shape);
    }
    getRandomColor() {
        const colors = ["#ff4fd8", "#ff8fe1", "#c86bff", "#7df9ff"];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    resizeCanvas() {
        
        let targetWidth = window.innerWidth * 0.9; 
        
        if (window.innerWidth > 1000) {
            targetWidth = 800;
        }

        this.canvas.width = targetWidth;
        
        this.canvas.height = window.innerHeight * 0.6; 
    }

}