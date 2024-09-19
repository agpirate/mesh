// useScroll.js
import { ref, onMounted, onUnmounted } from "vue";

export function useScroll(threshold = 200) {
  const isScrolled = ref(false);
  const isScrolledUp = ref(false);
  const oldScroll = ref(0);

  const handleScroll = () => {
    isScrolledUp.value = window.scrollY > oldScroll.value ? true : false;
    isScrolled.value = window.scrollY > threshold;
    oldScroll.value = isScrolled.value
      ? window.scrollY
      : window.scrollY + threshold;
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return { isScrolled, isScrolledUp };
}
