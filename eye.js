function createEyeLogo(container, size) {
  size = size || 48;

  var aspectRatio = 115 / 200;
  var height = Math.round(size * aspectRatio);
  var uniqueId = 'eye-' + Math.random().toString(36).substr(2, 9);

  var wrapper = document.createElement('div');
  wrapper.className = 'eye-logo';
  wrapper.style.width = size + 'px';
  wrapper.style.height = height + 'px';

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('viewBox', '0 0 200 115');

  var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  var clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
  clipPath.setAttribute('id', 'clip-' + uniqueId);

  var eyePath = 'M 200 56 C 195.8 49 191.1 42.4 185.4 37.1 '
    + 'C 182.4 34 179.2 31.1 175.9 28.2 '
    + 'C 171 23.8 165.7 20 159.8 16.7 '
    + 'C 157.2 15.2 154.5 13.8 151.6 12.4 '
    + 'C 150.1 11.7 148.7 10.9 147.3 10.3 '
    + 'C 146.3 9.9 145.2 9.5 144.2 9 '
    + 'C 142.6 8.4 141 7.6 139.4 7.1 '
    + 'C 136.9 6.3 134.3 5.5 131.7 4.8 '
    + 'C 129 4.1 126.3 3.3 123.5 2.8 '
    + 'C 120 2.2 116.5 1.7 113 1.3 '
    + 'C 110 1 107 0.7 103.9 0.7 '
    + 'C 99.7 0.7 95.5 0.8 91.2 1 '
    + 'C 89.3 1.1 87.3 1.3 85.3 1.6 '
    + 'C 82 2.1 78.8 2.6 75.6 3.2 '
    + 'C 73.6 3.6 71.7 4.1 69.8 4.6 '
    + 'C 66.5 5.6 63.1 6.6 59.7 7.7 '
    + 'C 57.7 8.3 55.8 9.1 54 10 '
    + 'C 51.5 11.1 49 12.3 46.6 13.5 '
    + 'C 39.3 17.3 32.5 22 26.1 29.2 '
    + 'C 20.7 33.7 15.7 38.6 11.2 44.2 '
    + 'C 7 49.2 3.2 54.4 0 60.1 '
    + 'C 0 60.3 0 61 0.1 61.2 '
    + 'C 0.5 62.1 0.9 63 1.5 63.6 '
    + 'C 4.4 67.7 7.3 72 10.5 75.9 '
    + 'C 13.8 79.9 17.5 83.7 21.2 87.4 '
    + 'C 25.3 91.4 29.8 95 34.6 98.2 '
    + 'C 40.2 102.1 46 105.5 52.3 108.2 '
    + 'C 56.2 109.9 60.2 111.3 64.2 112.8 '
    + 'C 69.2 114.6 74.4 115.7 79.6 116.6 '
    + 'C 85.5 117.6 91.5 118.2 97.5 118.4 '
    + 'C 99.1 118.4 100.5 118.4 102.1 118.3 '
    + 'C 103.6 118.3 105 118.2 106.6 118.1 '
    + 'C 112.9 117.9 118.1 117 124.2 115.7 '
    + 'C 130.2 114.4 135.8 112.6 141.5 110.4 '
    + 'C 148.1 107.8 154.4 104.5 160.5 100.7 '
    + 'C 167.9 96 174.6 90.6 181.7 84.4 '
    + 'C 186.1 80 190 75.4 193.8 70.3 '
    + 'C 195.9 67.3 198 64.2 200.1 60.9 '
    + 'C 200.5 60.2 200.4 59.6 200 56 Z';

  var clipShape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  clipShape.setAttribute('d', eyePath);
  clipShape.classList.add('eye-clip-path');

  clipPath.appendChild(clipShape);
  defs.appendChild(clipPath);
  svg.appendChild(defs);

  var outerShape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  outerShape.setAttribute('d', eyePath);
  outerShape.setAttribute('fill', '#000');
  outerShape.classList.add('eye-shape');
  outerShape.classList.add('eye-outer');
  svg.appendChild(outerShape);

  var clippedGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  clippedGroup.setAttribute('clip-path', 'url(#clip-' + uniqueId + ')');

  var irisGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  irisGroup.style.transformOrigin = '100px 57.5px';

  var pupil = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  pupil.setAttribute('cx', '120');
  pupil.setAttribute('cy', '57.5');
  pupil.setAttribute('r', '35');
  pupil.setAttribute('fill', '#fff');
  pupil.classList.add('eye-pupil');

  irisGroup.appendChild(pupil);
  clippedGroup.appendChild(irisGroup);
  svg.appendChild(clippedGroup);
  wrapper.appendChild(svg);
  container.appendChild(wrapper);

  var mouseX = 0;
  var mouseY = 0;
  var isBlinking = false;
  var rafId = null;

  function updatePupil() {
    if (isBlinking) return;

    var rect = wrapper.getBoundingClientRect();
    var eyeCenterX = rect.left + rect.width / 2;
    var eyeCenterY = rect.top + rect.height / 2;

    var angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
    var dist = Math.sqrt(Math.pow(mouseX - eyeCenterX, 2) + Math.pow(mouseY - eyeCenterY, 2));
    // Limit pupil travel — reduced maxDist and movement multiplier
    // so the pupil stays closer to center and doesn't reach the edge
    var maxDist = size * 0.15;
    var move = Math.min(dist * 0.06, maxDist);

    var tx = Math.cos(angle) * move;
    var ty = Math.sin(angle) * move;
    irisGroup.style.transform = 'translate(' + tx + 'px,' + ty + 'px)';
  }

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!rafId) {
      rafId = requestAnimationFrame(function() {
        updatePupil();
        rafId = null;
      });
    }
  }

  function triggerBlink() {
    if (isBlinking) return;
    isBlinking = true;
    wrapper.classList.add('blinking');
    setTimeout(function() {
      wrapper.classList.remove('blinking');
      isBlinking = false;
    }, 500);
  }

  wrapper.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    triggerBlink();
  });

  document.addEventListener('mousemove', onMouseMove, { passive: true });

  return {
    element: wrapper,
    blink: triggerBlink,
    destroy: function() {
      document.removeEventListener('mousemove', onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
      container.removeChild(wrapper);
    }
  };
}
