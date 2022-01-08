const canvas = document.querySelector('canvas')
const generateButton = document.querySelector('.generate-tree')
canvas.width = innerWidth
canvas.height = innerHeight
const ctx = canvas.getContext('2d')
const downBtn = document.querySelector('.check-btn')
let curve

function drawTree(startX, startY, length, angle, branchWidth, color1, color2) {
  ctx.beginPath()
  ctx.save()
  ctx.strokeStyle = color1
  ctx.fillStyle = color2
  ctx.lineWidth = branchWidth
  ctx.shadowBlur = 15
  ctx.shadowColor = 'black'
  ctx.translate(startX, startY)
  ctx.rotate((angle * Math.PI) / 180) //Converting degrees into radians
  ctx.moveTo(0, 0)
  //   ctx.lineTo(0, -length)

  if (length > 0) {
    ctx.bezierCurveTo(10, -length / 2, 10, -length / 2, 0, -length)
  } else {
    ctx.bezierCurveTo(10, -length / 2, -10, -length / 2, 0, -length)
  }
  ctx.stroke()

  // Base case for our reccursion
  if (length < 15) {
    ctx.beginPath()
    ctx.arc(0, -length, 10, 0, Math.PI / 2)
    ctx.fill()
    ctx.restore()
    return
  }

  curve = Math.random() * 10 + 10

  drawTree(0, -length, length * 0.75, angle + curve, branchWidth * 0.6)
  drawTree(0, -length, length * 0.75, angle - curve, branchWidth * 0.6)

  ctx.restore()
}

function createRandomTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  let x = canvas.width / 2
  const length = 170
  let angle = 0
  let branchWidth = Math.random() * (170 - 30) + 30
  drawTree(
    x,
    canvas.height - 80,
    length,
    angle,
    branchWidth,
    'white',
    'rgb(232, 232, 213)'
  )
  generateButton.className += ' move'
}

generateButton.addEventListener('click', createRandomTree)
downBtn.addEventListener('click', () => {
  window.scrollTo({
    top: window.innerHeight,
    left: 0,
    behavior: 'smooth',
  })
})
