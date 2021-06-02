const canvas =document.getElementById('canvas-window');
const ctx= canvas.getContext('2d');
ctx.canvas.width= window.innerWidth;
ctx.canvas.height = 1000;
const base_image = new Image();
base_image.src = 'img/base.png';
let audio=new Audio();
audio.src='audio/simmu.mp3';


//Function to play the exact file format
function playAudio(){
    audio.play();
}


ctx.beginPath();

ctx.rect(600, 500, 350, 280);

ctx.stroke();
ctx.closePath();

base_image.onload = function() {
    ctx.drawImage(base_image,650,450, 226, 300);
}

let particleArray=[]
let adjustX = 8;
let adjustY = 15;

const mouse = {
    x: null,
    y: null,
    radius: 100
}

window.addEventListener('mousemove',(event)=>{
    
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('keyup', (event)=>{
    if (event.keyCode==82){
        audio.currentTime=0;
        audio.play();
    }

    if (event.keyCode==65){
        audio.pause();
        audio.currentTime=0;
    }
})

ctx.beginPath()
ctx.font="12px sans-serif"
ctx.fillStyle = "#ffffff";
ctx.fillText('Dane ♥ Simmu', 10, 10)
ctx.fillStyle = "#a9a9a9"
ctx.font="15px sans-serif"
ctx.fillText('Happy Anniversary Maya', 700, 550)
ctx.closePath()
const textCoordinates = ctx.getImageData(0, 0, 200, 200);


class Particle{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;  
        this.density = (Math.random() *30) +1; 
        this.distance = 1000
    }

    draw(){

        if (this.distance >= 70 && this.distance<= 100){
            ctx.fillStyle = `rgba(255,255,0,0.7)`;
        }
        else{
            if (this.x>=721 && this.x<=878 && this.y>=264 && this.y<=400){
                ctx.fillStyle = `red`;
            }
            else{
                ctx.fillStyle = `white`;
            }
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update(){
        let dx=mouse.x-this.x
        let dy= mouse.y-this.y
        let distance= Math.sqrt(dx*dx + dy*dy)
        let forceDirectionX = dx/distance;
        let forceDirectionY = dy/distance;
        let maxDistance = mouse.radius; 
        let force = (maxDistance-distance)/maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
      
        this.distance= distance
       
        if (distance< mouse.radius){
            this.x-=directionX;
            if (this.y-directionY>480){
                this.y=this.baseY
            }
            else{
                this.y-=directionY;
            }
            
        }
        else{
            if(this.x !== this.baseX){
                let dx = this.x - this.baseX;
                this.x -= dx/10;
            }

            if (this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -=dy/10;
            }
        }

    }
}

function init(){
    particleArray=[];
    for (let y=0, y2=textCoordinates.height;y<y2; y++){
        for (let x=0, x2=textCoordinates.width; x<x2; x++){
            if(textCoordinates.data[(y * 4* textCoordinates.width) + (x*4)+ 3]>128){
                let positionX=x + adjustX;
                let positionY=y + adjustY;

                particleArray.push(new Particle(positionX*15, positionY* 15))
            }
        }
    }

    ctx.beginPath();
    ctx.stroke();
}

function strokeHeart(locationSetter){
    var w = 24, h = 10;
        ctx.strokeStyle = "#000000";
        ctx.strokeWeight = 3;
        ctx.shadowOffsetX = 4.0;
        ctx.shadowOffsetY = 4.0;
        ctx.lineWidth = 10.0;
        ctx.fillStyle = "#FF0000";
        let d = Math.min(w, h);
        let k = locationSetter;
        ctx.beginPath()
        ctx.moveTo(k, k + d / 4);
        ctx.quadraticCurveTo(k, k, k + d / 4, k);
        ctx.quadraticCurveTo(k + d / 2, k, k + d / 2, k + d / 4);
        ctx.quadraticCurveTo(k + d / 2, k, k + d * 3/4, k);
        ctx.quadraticCurveTo(k + d, k, k + d, k + d / 4);
        ctx.quadraticCurveTo(k + d, k + d / 2, k + d * 3/4, k + d * 3/4);
        ctx.lineTo(k + d / 2, k + d);
        ctx.lineTo(k + d / 4, k + d * 3/4);
        ctx.quadraticCurveTo(k, k + d / 2, k, k + d / 4);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
}

function drawHearts(){

      ctx.clearRect( 0, 500, canvas.width, canvas.height-500);
      ctx.beginPath();
      ctx.rect(600, 500, 350, 280);
      ctx.fillStyle = "#a9a9a9"
      ctx.font="15px sans-serif"
      ctx.fillText('Happy Anniversary Maya', 700, 550)
      ctx.stroke();
      ctx.closePath();
      ctx.drawImage(base_image,650,450, 226, 300);
      strokeHeart(770)
      ctx.font="20px georgia";
      ctx.fillStyle="white"
      ctx.fillText('Press R to play audio', 250, 600 )
      ctx.fillText('Press A to stop audio', 1100, 600 )
}

function getRandomInt(n) {
 
    return Math.floor(Math.random() * n);
}

function animate(){
    ctx.clearRect( 0, 0, canvas.width, 500);
    for (let i=0; i< particleArray.length; i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
    connect();
    drawHearts();
    requestAnimationFrame(animate);
    
}

function connect(){
    let opacityValue = 1
    for (let a=0; a< particleArray.length; a++){
        for (let b=a; b< particleArray.length; b++){
               let dx = particleArray[a].x - particleArray[b].x
               let dy = particleArray[a].y - particleArray[b].y
               let distance = Math.sqrt(dx * dx + dy * dy)
    
               
               if (distance < 25){
                   opacityValue =1-(distance/25);
                   if (particleArray[a].distance>30 && particleArray[a].distance<50
                    ){
                    ctx.strokeStyle = `rgba(255, 255, 0, ${opacityValue})`;
                   }
                   else{
                        if (particleArray[a].x>=721 && particleArray[a].x<=878 && particleArray[a].y>=264 && particleArray[a].y<=400){
                            ctx.strokeStyle = `rgba(255, 0, 0, ${opacityValue})`
                        }
                        else{
                            ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
                        }
                   }
                   ctx.lineWidth = 2;
                   ctx.beginPath();
                   ctx.moveTo(particleArray[a].x, particleArray[a].y);
                   ctx.lineTo(particleArray[b].x, particleArray[b].y)
                   ctx.stroke();
                   ctx.closePath();
               
               }
        }
    }
}
init();
animate();