function createEyeLogo(container, size) {
  size = size || 48;
  var halfHeight = size * 0.5;
  var uniqueId = 'eye-' + Math.random().toString(36).substr(2, 9);

  var wrapper = document.createElement('div');
  wrapper.className = 'eye-logo';
  wrapper.style.width = size + 'px';
  wrapper.style.height = halfHeight + 'px';

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('viewBox', '0 0 200 100');

  var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  var clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
  clipPath.setAttribute('id', 'clip-' + uniqueId);

  var clipShape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  clipShape.setAttribute('d', 'M 0 50 Q 50 0 100 0 Q 150 0 200 50 Q 150 100 100 100 Q 50 100 0 50 Z');
  clipShape.classList.add('eye-clip-path');

  clipPath.appendChild(clipShape);
  defs.appendChild(clipPath);
  svg.appendChild(defs);

  var outerShape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  outerShape.setAttribute('d', 'M 0 50 Q 50 0 100 0 Q 150 0 200 50 Q 150 100 100 100 Q 50 100 0 50 Z');
  outerShape.setAttribute('fill', '#000');
  outerShape.classList.add('eye-shape');
  outerShape.classList.add('eye-outer');
  svg.appendChild(outerShape);

  var clippedGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  clippedGroup.setAttribute('clip-path', 'url(#clip-' + uniqueId + ')');

  var irisGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  irisGroup.style.transformOrigin = '100px 50px';

  var pupil = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  pupil.setAttribute('cx', '120');
  pupil.setAttribute('cy', '50');
  pupil.setAttribute('r', '28');
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
    var maxDist = size * 0.35;
    var move = Math.min(dist * 0.12, maxDist);

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
