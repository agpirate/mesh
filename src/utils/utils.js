
import { ref, reactive, computed } from "vue";



/////////////////////// Screen size
let screenSize=ref()
screenSize = computed(() => {
  try{
    const width= window.innerWidth
    const height  = window.innerHeight
  if (width < 600 || height < 400) {
    return 'Small';
  } else if ((width >= 600 && width < 1200) || (height >= 400 && height < 800)) {
    return 'Medium';
  } else {
    return 'Large';
  }
  }catch{return 0 }
});

export { screenSize,}