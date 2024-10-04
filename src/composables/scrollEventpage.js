// useScroll.js
import { ref, onMounted, onUnmounted } from "vue";

export function useScroll(threshold = 200) {
  const isScrolled = ref(false);
  const isScrolledUp = ref(false);
  const isScrolledDown = ref(false);
  const oldScroll = ref(0);

  const handleScroll = () => {
    isScrolledUp.value = window.scrollY > oldScroll.value ? true : false;
    isScrolled.value = window.scrollY > threshold;

    oldScroll.value = isScrolled.value
      ? window.scrollY
      : window.scrollY + threshold;

    isScrolledDown.value =
      window.scrollY + window.innerHeight >= document.body.scrollHeight - 5;
    console.log(
      "windowH -",
      window.innerHeight,
      "; Yscrolls - ",
      window.scrollY,
      "sumWindows_Height -",
      window.scrollY + window.innerHeight,
      "; BodyHeights -",
      document.body.scrollHeight
    );
    // window.innerHeight + window.scrollY + 4 >=
    // document.body.scrollHeight;
    return true;
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return { isScrolled, isScrolledUp, isScrolledDown };
}
