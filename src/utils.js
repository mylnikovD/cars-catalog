export default function debounce(f, duration) {
  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    isCooldown = true;
    f.apply(this, arguments);

    setTimeout(() => (isCooldown = false), duration);
  };
}
