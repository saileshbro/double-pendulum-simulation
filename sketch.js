let l1 = () => +document.getElementById('l1').value
let l2 = () => +document.getElementById('l2').value
let m1 = () => +document.getElementById('m1').value
let m2 = () => +document.getElementById('m2').value
let g = () => +document.getElementById('g').value
let damping = () => +document.getElementById('damping').value
let a1 = 0
let a2 = 0
let a1_v = 0
let a2_v = 0
let px2 = -1
let px1 = -1,
  py1 = -1
let py2 = -1
let cx, cy
let buffer
function setup() {
  createCanvas(1200, windowHeight - 40)
  colorMode(RGB, 255, 255, 255, 1)
  pixelDensity(1)
  a2 = -PI / 2
  a1 = -PI / 2
  cx = width / 2
  cy = displayHeight * 0.35
  colours = [
    color(229, 252, 255, 0.3),
    color(122, 79, 242, 0.7),
    color(230, 9, 116, 0.7),
    color(0, 34, 51),
  ]
  buffer = createGraphics(width, height)
  buffer.background(colours[3])
  buffer.translate(cx, cy)
}

function draw() {
  background(colours[3])
  imageMode(CORNER)
  image(buffer, 0, 0, width, height)
  let num1 = -g() * (2 * m1() + m2()) * sin(a1)
  let num2 = -m2() * g() * sin(a1 - 2 * a2)
  let num3 = -2 * sin(a1 - a2) * m2()
  let num4 = a2_v * a2_v * l2() + a1_v * a1_v * l1() * cos(a1 - a2)
  let den = l1() * (2 * m1() + m2() - m2() * cos(2 * a1 - 2 * a2))
  let a1_a = (num1 + num2 + num3 * num4) / den

  num1 = 2 * sin(a1 - a2)
  num2 = a1_v * a1_v * l1() * (m1() + m2())
  num3 = g() * (m1() + m2()) * cos(a1)
  num4 = a2_v * a2_v * l2() * m2() * cos(a1 - a2)
  den = l2() * (2 * m1() + m2() - m2() * cos(2 * a1 - 2 * a2))
  let a2_a = (num1 * (num2 + num3 + num4)) / den

  translate(cx, cy)
  stroke(colours[0])
  strokeWeight(3)

  let x1 = l1() * sin(a1)
  let y1 = l1() * cos(a1)

  let x2 = x1 + l2() * sin(a2)
  let y2 = y1 + l2() * cos(a2)

  line(0, 0, x1, y1)
  fill(colours[0])
  ellipse(x1, y1, m1() * 1.15, m1() * 1.15)

  line(x1, y1, x2, y2)
  fill(colours[0])
  ellipse(x2, y2, m2() * 1.15, m2() * 1.15)

  a1_v += a1_a
  a2_v += a2_a
  a1 += a1_v
  a2 += a2_v

  a1_v *= damping()
  a2_v *= damping()
  if (frameCount > 1) {
    const trans = map(x2, (l1() + l2()) * -1, l1() + l2(), 0, 1)
    buffer.stroke(
      lerpColor(colours[2], colours[1], constrain(trans * random(0, 1), 0, 1)),
    )
    buffer.strokeWeight(1.5)
    buffer.stroke(lerpColor(colours[1], colours[2], trans))
    buffer.line(px1, py1, x1, y1)
    buffer.line(px2, py2, x2, y2)
  }
  px1 = x1
  py1 = y1
  px2 = x2
  py2 = y2
}
