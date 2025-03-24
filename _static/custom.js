document.addEventListener('DOMContentLoaded', function() {
    // Get saved zoom level or use default
    const savedZoom = localStorage.getItem('jupyterBookZoom') || '100';
    
    // Apply saved zoom
    document.body.style.zoom = savedZoom + '%';
    
    // Listen for zoom changes (Ctrl+/- or mouse wheel)
    window.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-')) {
        setTimeout(saveCurrentZoom, 100);
      }
    });
    
    // Also try to detect zoom changes from mouse wheel
    window.addEventListener('wheel', function(e) {
      if (e.ctrlKey || e.metaKey) {
        setTimeout(saveCurrentZoom, 100);
      }
    });
    
    function saveCurrentZoom() {
      // Get computed zoom value
      const zoom = document.body.style.zoom || '100%';
      const zoomValue = parseInt(zoom);
      if (!isNaN(zoomValue)) {
        localStorage.setItem('jupyterBookZoom', zoomValue);
      }
    }
  });