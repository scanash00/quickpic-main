export const styles = {
  // Layout
  container: "flex flex-col items-center gap-8 p-6",
  toolContainer: "flex flex-col gap-6 w-full max-w-3xl mx-auto p-6 bg-background/50 backdrop-blur-sm rounded-lg shadow-lg border border-accent/10",
  toolDescription: "mb-8 text-center",

  // Image container
  imageContainer: "relative w-full aspect-video flex items-center justify-center bg-background/30 rounded-lg overflow-hidden border border-accent/10",
  imageDimensions:
    "absolute top-2 right-2 rounded-md bg-gray-900/80 px-3 py-1.5 text-xs text-white backdrop-blur",
  image: "max-w-full max-h-full object-contain",

  // Upload box
  uploadBox: {
    container: "w-full max-w-2xl mx-auto",
    inner:
      "relative flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-white/20 bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-8 text-center backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:shadow-lg hover:from-white/[0.12] hover:to-white/[0.06]",
    iconContainer:
      "flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-b from-white/[0.12] to-white/[0.08] text-white/70 transition-all duration-300 group-hover:scale-110 group-hover:from-white/[0.16] group-hover:to-white/[0.12] group-hover:text-white/90",
    title: "text-xl font-semibold text-white/90 tracking-tight",
    subtitle: "mt-1 text-sm text-white/60 tracking-wide",
    buttonContainer: "flex flex-col items-center gap-3 mt-2",
    uploadButton:
      "px-5 py-2 text-sm font-medium text-white/90 bg-gradient-to-b from-white/[0.12] to-white/[0.08] rounded-lg border border-white/20 transition-all duration-300 hover:from-white/[0.16] hover:to-white/[0.12] hover:border-white/30 hover:shadow-lg hover:shadow-white/10 hover:text-white active:scale-[0.98]",
    dragText: "text-sm font-medium text-white/70 tracking-wide",
  },

  // Controls
  controlsContainer: "flex flex-col gap-4 w-full",
  label: "block text-sm font-medium text-foreground/80 mb-1",
  slider: "w-full h-2 bg-accent/10 rounded-lg appearance-none cursor-pointer accent-primary",
  sliderValue: "text-sm text-white/60 text-center",

  // Buttons container
  buttonsContainer: "flex flex-wrap gap-4 justify-center",

  // Buttons
  primaryButton: "px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
  secondaryButton: "px-6 py-2 bg-accent/10 text-foreground rounded-lg font-medium transition-all duration-200 hover:bg-accent/20 hover:scale-[1.02] active:scale-[0.98]",

  // Option selector
  optionGrid: "grid grid-cols-2 sm:grid-cols-4 gap-2",
  optionButton: {
    base: "w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
    selected: "bg-primary text-primary-foreground shadow-lg",
    unselected: "bg-accent/10 hover:bg-accent/20 text-foreground",
  },

  // Animations
  fadeIn: "animate-fade-in",

  // Hover effects
  glowHover: "hover:shadow-lg hover:shadow-blue-500/20",

  // Utils
  hidden: "hidden",
};
