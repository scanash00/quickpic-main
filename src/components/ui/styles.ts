export const styles = {
  container: "flex flex-col items-center gap-8 p-6",
  toolContainer: "w-full max-w-2xl mx-auto space-y-6 animate-fade-in",
  
  // Image container
  imageContainer: "relative w-full rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all hover:border-white/30",
  imageDimensions: "absolute top-2 right-2 rounded-md bg-gray-900/80 px-3 py-1.5 text-xs text-white backdrop-blur",
  image: "mx-auto max-h-[500px] w-full object-contain",
  
  // Controls
  controlsContainer: "flex flex-col gap-2",
  label: "block text-sm font-medium text-white/60",
  slider: "w-full accent-blue-600",
  sliderValue: "text-sm text-white/60 text-center",
  
  // Buttons container
  buttonsContainer: "flex gap-4 justify-center",
  
  // Buttons
  primaryButton: "inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white shadow-sm transition-all hover:bg-blue-700 active:bg-blue-800",
  secondaryButton: "inline-flex items-center gap-2 rounded-lg bg-white/10 px-6 py-2.5 font-medium text-white/80 transition-all hover:bg-white/20 active:bg-white/30",
  
  // Option selector
  optionGrid: "grid grid-cols-2 sm:grid-cols-4 gap-3",
  optionButton: {
    base: "relative flex items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
    selected: "border-blue-500 bg-blue-500/20 text-blue-300",
    unselected: "border-white/20 bg-white/10 text-white/80 hover:border-white/30 hover:bg-white/20"
  },
  
  // Animations
  fadeIn: "animate-fade-in",
  
  // Hover effects
  glowHover: "hover:shadow-lg hover:shadow-blue-500/20",
  
  // Utils
  hidden: "hidden"
}